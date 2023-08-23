const getAll = async () => {
  await $.ajax({
    method: 'GET',
    headers: { "Accept": "application/json" },
    url: 'http://localhost:5207/api/Comment/Index'
  }).done(function (res) {
    content = "";
    for (let i = 0; i < res.length; i++) {
      content += `
            <tr class="text-center">
                <td>${res[i].id}</td>
                <td>${res[i].title}</td>
                <td>${res[i].description}</td>
                <td>${res[i].author} </td>
                <td>${res[i].createdAt}</td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal' onclick='deleteBook(${res[i].id})' data-target='#delete' ><i class="fas fa-trash"></i></button>
                </td>
                <td>
                    <button data-toggle='modal' onclick='getInfoUpdateBook(${res[i].id})' data-target='#update' class='btn btn-warning'><i class="fas fa-edit"></i></button>
                </td>
                
            </tr>
                `;
    }
    $("#table > tbody").html(content);

  });
};



const deleteBook =  (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then(async(result) => {
    await $.ajax({
      method: 'DELETE',
      url: 'http://localhost:5207/api/Comment/Destroy?id=' + id
    })
    getAll()
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
}


const getByIdF = async id => {
  return await $.ajax({
      type: 'GET',
      url: 'http://localhost:5207/api/Comment/Show?id=' + id
  }).done(res => {
      console.log(res)
      let id = res.id;
      let title = res.title;
      let description = res.description;
      let author = res.author;
      let createdAt = res.createdAt;
      localStorage.setItem("id", id);
      localStorage.setItem("title", title);
      localStorage.setItem("description", description);
      localStorage.setItem("author", author);
      localStorage.setItem("createdAt", createdAt);

      
  });
};


//Obtener informacion para actualizar

const getInfoUpdateBook = async id => {
  let book = await getByIdF(id);
  console.log(book)
  $("#title").val(book.id)
  $("#description").val(book.description),
  $("#author").val(book.author)
};

//Actualizar arreglo

const updateArreglo = async() => {
  let id = document.getElementById('id_update').value;
  let title = document.getElementById('titulo').value;
  let description = document.getElementById('description').value;
  let author = document.getElementById('author').value;
  

  $.ajax({
      type: 'POST',
      url: urlA + 'http://localhost:5207/api/Comment/Update?id=' + id,
      data: {
        "id": id,
        "title": title,
        "description": description,
        "author": author,

      }
  }).done(function(res) {
      getAll();
  });
};
      
    

    
    
