using System;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; }

        [Required, MinLength(10)]
        public required string Description { get; set; }

        public bool IsCompleted { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
