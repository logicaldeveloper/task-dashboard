<h3> Task Management Dashboard </h3>
This is a Node.js-based task management system designed to help users efficiently manage tasks, assign them to individuals, set reminders, and track progress. It includes a web-based dashboard with intuitive controls for adding, updating, and organizing tasks into queues. Below is a concise summary of the application's features, structure and functionality

<pre>
<b>Key Features</b>

Task Management :
    Users can add tasks dynamically via a web form or API.
    Tasks are displayed in queues: "To Do," "In Progress," and "Completed."
    Users can move tasks between queues by updating their status.
Assign Tasks :
    Each task can be assigned to a specific individual (e.g., team member).
    The assignee's name is displayed alongside the task in the dashboard.
Set Reminders :
    Users can set reminders for tasks to track progress manually.
    A cron job checks for upcoming reminders and logs notifications (optional: integrate email alerts).
Real-Time Date and Time Display :
    The footer displays:
        Current local date and time.
        Current time in Singapore (Asia/Singapore).
        Current time in Zurich (Europe/Zurich).
    Times update dynamically every second using JavaScript.

Editable Tasks :
    Users can edit existing tasks to update their assignee or reminder.
</pre>