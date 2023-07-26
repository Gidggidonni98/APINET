const getAll = async() => {
    await $.ajax({
        method: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:5207/api/Comment/Index'
    }).done(function(res) {
        content = "";
        console.log(res)
        res = res.listProducto;
        for (let i = 0; i < res.length; i++) {
            let array8 = new Uint8Array(res[i].imagen.data);
            var imagen = new TextDecoder().decode(array8);
            content += `
            <tr class="text-center">
                <td>${res[i].idArreglo}</td>
                <td>${res[i].name}</td>
                <td>${res[i].price}</td>
                <td>${res[i].status ==1?"Activo":"Inactivo"} </td>
                <td>${res[i].quantity}</td>
                <td>
                    <button class='btn btn-primary' data-toggle='modal' onclick='getInfoArreglo(${res[i].idArreglo})'  data-target='#detallesProducto'><i class='fas fa-info-circle'></i></button>
                </td>
                <td>
                    <button data-toggle='modal' onclick='getInfoUpdateArreglo(${res[i].idArreglo})' data-target='#update' class='btn btn-warning'><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class='btn btn-danger' data-toggle='modal' onclick='getId(${res[i].idArreglo})' data-target='#delete' ><i class="fas fa-trash"></i></button>
                </td>
            </tr>
                `;
        }
        $("#productos > tbody").html(content);

        contenido = "";
        for (let i = 0; i < res.length; i++) {
            let array8 = new Uint8Array(res[i].imagen.data);
            var imagen = new TextDecoder().decode(array8);
            contenido += ` 
                <div class="col-12 col-sm-3 col-md-3">
                    <figure>
                        <a href="./Pedido.html" onclick='getByIdF(${res[i].idArreglo})'>
                            <img  class="img-fluid rounded float-start" width="75%" height="75%" src= "data:image/*;base64,${imagen}" alt="">
                            <div class="text-warning mt-2">
                                <h6 style="color: black;">${res[i].name}</h6>
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                                <h3 style="color: black;" style="font-size: 22px;">$${res[i].price}<span style="font-size: 22px;">.00</span></h3>
                            </div>
                        </a>
                    </figure>
                </div>
              `;
        }
        $("#show > div").html(contenido);
    });
};
getAll();
