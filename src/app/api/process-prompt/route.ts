import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    console.log("Received prompt:", prompt);

    const currentDate = Date.now();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that helps organize tasks and events. 
          Please respond with a JSON object containing two outputs: 'listView' and 'calendarView'.
          
          The 'listView' should contain 'tasks' and 'events' arrays:
          - Each task should have an 'id', 'description', 'completed' (boolean), 'dateTime', and 'type' ("Task") field.
          - Each event should have an 'id', 'description', 'dateTime', and 'type' ("Event") field.
          
          The 'calendarView' should be an object where each key is a date (YYYY-MM-DDTHH:MM:SSZ format), and the value is an object containing 'tasks' and 'events' arrays for that date.

          If a time for particular tasks or events are not specified, put 12:00AM in the dateTime field.

          Today's date and time is 10/19/2024. Base your response off of the current Date.
          
          If no tasks or events are identified, return empty arrays or objects as appropriate.
          
          The response should strictly follow this format:
          {
            "listView": {
              "tasks": [
                {
                  "id": "task1",
                  "description": "Task description",
                  "completed": false,
                  "dateTime": "YYYY-MM-DDTHH:MM:SSZ",
                  "type": "Task",
                }
              ],
              "events": [
                {
                  "id": "event1",
                  "description": "Event description",
                  "dateTime": "YYYY-MM-DDTHH:MM:SSZ",
                  "type": "Event",
                }
              ]
            },
            "calendarView": {
              "YYYY-MM-DDTHH:MM:SSZ": {
                "tasks": [
                  {
                    "id": "task1",
                    "description": "Task description",
                    "completed": false,
                    "dateTime": "YYYY-MM-DDTHH:MM:SSZ",
                    "type": "Task",
                  }
                ],
                "events": [
                  {
                    "id": "event1",
                    "description": "Event description",
                    "dateTime": "YYYY-MM-DDTHH:MM:SSZ",
                    "type": "Event",
                  }
                ]
              }
            }
          }`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const result = completion.choices[0].message.content;
    console.log("OpenAI response:", result);

    // Attempt to parse the result as JSON
    try {
      return NextResponse.json(JSON.parse(result || ""));
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return NextResponse.json({ tasks: [], events: [] });
    }
  } catch (error) {
    console.error("Error processing prompt:", error);
    return NextResponse.json(
      { error: "Error processing prompt" },
      { status: 500 }
    );
  }
}
