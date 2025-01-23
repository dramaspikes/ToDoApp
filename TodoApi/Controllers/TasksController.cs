using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using TodoApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TodoContext _context;

        public TasksController(TodoContext context)
        {
            _context = context;

        }

        // GET: api/tasks
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return _context.Tasks.ToList();
        }

        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null)
            {
                return NotFound();
            }
            return task;
        }

        // POST: api/tasks
        [HttpPost]
        public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
        {
            if (task == null || string.IsNullOrWhiteSpace(task.Title) || task.Description.Length < 10)
            {
                return BadRequest("Invalid task data. Title and description are required.");
            }

            task.CreatedAt = DateTime.UtcNow;
            _context.Tasks.Add(task);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskItem updatedTask)
        {
            if (id != updatedTask.Id)
            {
                return BadRequest("Task ID mismatch.");
            }

            var task = _context.Tasks.Find(id);
            if (task == null)
            {
                return NotFound();
            }

            // Update fields
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.IsCompleted = updatedTask.IsCompleted;
            task.CreatedAt = updatedTask.CreatedAt; // Keep original creation date

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
