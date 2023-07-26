using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using API_REST_DOTNET.Models;

namespace API_REST_DOTNET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context; //Esto es usado instead of this.context
        public CommentController(ApplicationDbContext context){
            _context = context;
        }

        [HttpGet("Index")] //Tipo de peticion
        public async Task<IActionResult> Index(){ //Numero de argumentos que recibe
            var listComments = await _context.Comments.ToListAsync();
            if(listComments == null || listComments.Count == 0){
                return NoContent();    
            }else {
                return Ok(listComments);
            }
        }
        [HttpPost("Store")]
public async Task<HttpStatusCode> Store([FromBody] Comment comment)
{
    if (comment == null)
    {
        return HttpStatusCode.BadRequest;
    }
    _context.Add(comment);
    await _context.SaveChangesAsync();
    return HttpStatusCode.Created;
}

[HttpGet("Show")]
public async Task<IActionResult> Show(int id)
{
    var comment = await _context.Comments.FindAsync(id);
    if (comment == null)
    {
        return NotFound();
    }
    return Ok(comment);
}

[HttpDelete("Destroy")]
public async Task<IActionResult> Destroy(int id)
{
    var comment = await _context.Comments.FindAsync(id);
    if (comment == null)
    {
        return NotFound();
    }
     _context.Comments.Remove(comment);
    await _context.SaveChangesAsync();
    return Ok();
}

[HttpPut("Update")]

public async Task<IActionResult> Update(int id, [FromBody] Comment comment){
    if(comment ==null || comment.Id != id){
        return BadRequest(); //400
    }
    var entity = await _context.Comments.FindAsync(comment.Id);
    if (entity == null){
        return NotFound(); //404
    }

    entity.Title = comment.Title;
    entity.Description = comment.Description;
    entity.Author = comment.Author;
    entity.CreatedAt = comment.CreatedAt;
    await _context.SaveChangesAsync();
    return Ok();
    {
        
    }
}
        
    }
}