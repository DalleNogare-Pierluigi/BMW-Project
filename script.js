const formTestDrive =
    document.getElementById("formTestDrive");


if (formTestDrive) {

    formTestDrive.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const modelo =
            document.getElementById("modelo").value;

        const fecha =
            document.getElementById("fechaTestDrive").value;

        if (nombre === "") {

            alert("Por favor, ingresá tu nombre.");

            return;

        }

        if (correo === "") {

            alert("Por favor, ingresá tu correo electrónico.");

            return;

        }

        if (modelo === "") {

            alert("Por favor, seleccioná un modelo.");

            return;

        }

        if (fecha === "") {

            alert("Por favor, seleccioná una fecha.");

            return;

        }

        try {

            const respuesta = await fetch("/test-drive", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    nombre,
                    correo,
                    modelo,
                    fecha

                })

            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                alert(
                    datos.mensaje ||
                    "No se pudo registrar el Test Drive."
                );

                return;

            }

            alert(

                "¡Test Drive reservado correctamente!\n\n" +

                "Nombre: " + nombre + "\n" +

                "Correo: " + correo + "\n" +

                "Modelo: " + modelo + "\n" +

                "Fecha: " + fecha

            );

            formTestDrive.reset();

        }

        catch (error) {

            console.error(error);

            alert(

                "No se pudo conectar con el servidor.\n\n" +

                "Verificá que server.js esté funcionando."

            );

        }

    });

}

const formService =
    document.getElementById("formService");


if (formService) {

    formService.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombreService =
            document
                .getElementById("nombreService")
                .value
                .trim();


        const correoService =
            document
                .getElementById("correoService")
                .value
                .trim();


        const modeloService =
            document
                .getElementById("modeloService")
                .value
                .trim();


        const fechaService =
            document
                .getElementById("fechaService")
                .value;


        const tipoService =
            document
                .getElementById("tipoService")
                .value;

        if (nombreService === "") {

            alert("Por favor, ingresá tu nombre.");

            return;

        }

        if (correoService === "") {

            alert("Por favor, ingresá tu correo electrónico.");

            return;

        }

        if (modeloService === "") {

            alert(
                "Por favor, ingresá el modelo del vehículo."
            );

            return;

        }

        if (fechaService === "") {

            alert(
                "Por favor, seleccioná una fecha."
            );

            return;

        }

        if (tipoService === "") {

            alert(
                "Por favor, seleccioná el tipo de Service."
            );

            return;

        }

        try {

            const respuesta = await fetch("/service", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    nombre: nombreService,

                    correo: correoService,

                    modelo: modeloService,

                    fecha: fechaService,

                    tipoService: tipoService

                })

            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                alert(

                    datos.mensaje ||
                    "No se pudo registrar el Service."

                );

                return;

            }

            alert(

                "¡Turno de Service reservado correctamente!\n\n" +

                "Nombre: " + nombreService + "\n" +

                "Correo: " + correoService + "\n" +

                "Modelo: " + modeloService + "\n" +

                "Fecha: " + fechaService + "\n" +

                "Service: " + tipoService

            );

            formService.reset();

        }

        catch (error) {

            console.error(error);

            alert(

                "No se pudo conectar con el servidor.\n\n" +

                "Verificá que server.js esté funcionando."

            );

        }

    });

}

const formContacto =
    document.getElementById("formContacto");

if (formContacto) {

    formContacto.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombreContacto =
            document
                .getElementById("nombreContacto")
                .value
                .trim();


        const correoContacto =
            document
                .getElementById("correoContacto")
                .value
                .trim();

        const asuntoContacto =
            document
                .getElementById("asuntoContacto")
                .value
                .trim();

        const mensajeContacto =
            document
                .getElementById("mensajeContacto")
                .value
                .trim();

        if (nombreContacto === "") {

            alert(
                "Por favor, ingresá tu nombre."
            );

            return;

        }

        if (correoContacto === "") {

            alert(
                "Por favor, ingresá tu correo electrónico."
            );

            return;

        }

        if (asuntoContacto === "") {

            alert(
                "Por favor, ingresá el asunto."
            );

            return;

        }

        if (mensajeContacto === "") {

            alert(
                "Por favor, escribí tu consulta."
            );

            return;

        }

        try {

            const respuesta = await fetch("/contacto", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    nombre: nombreContacto,

                    correo: correoContacto,

                    asunto: asuntoContacto,

                    mensaje: mensajeContacto

                })

            });


            const datos =
                await respuesta.json();

            if (!respuesta.ok) {

                alert(

                    datos.mensaje ||
                    "No se pudo enviar la consulta."

                );

                return;

            }

            alert(

                "¡Consulta enviada correctamente!\n\n" +

                "Gracias, " +
                nombreContacto +
                ".\n\n" +

                "Nos pondremos en contacto con vos."

            );

            formContacto.reset();

        }

        catch (error) {

            console.error(error);

            alert(

                "No se pudo conectar con el servidor.\n\n" +

                "Verificá que server.js esté funcionando."

            );

        }

    });

}

const formWhatsapp =
    document.getElementById("formWhatsapp");


if (formWhatsapp) {

    formWhatsapp.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nombre =
                document
                    .getElementById("nombreWhatsapp")
                    .value
                    .trim();

            const mensaje =
                document
                    .getElementById("mensajeWhatsapp")
                    .value
                    .trim();

            if (!nombre) {

                alert(
                    "Por favor, ingresá tu nombre."
                );

                return;

            }

            if (!mensaje) {

                alert(
                    "Por favor, escribí tu consulta."
                );

                return;

            }

            const numeroWhatsApp =
                "5491133430999";


            const textoWhatsApp =
                `Hola, soy ${nombre}.

${mensaje}

Me contacto desde BMW PROJECT.`;
            const mensajeCodificado =
                encodeURIComponent(
                    textoWhatsApp
                );


            const urlWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

            window.open(
                urlWhatsApp,
                "_blank"
            );

            formWhatsapp.reset();

        }
    );

}

const formRegistroReserva =
    document.getElementById("formRegistroReserva");


if (formRegistroReserva) {

    formRegistroReserva.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombreReserva =
            document
                .getElementById("nombreReserva")
                .value
                .trim();

        const correoReserva =
            document
                .getElementById("correoReserva")
                .value
                .trim();

        const tipoReserva =
            document
                .getElementById("tipoReserva")
                .value;

        if (nombreReserva === "") {

            alert(
                "Por favor, ingresá tu nombre."
            );

            return;

        }


        if (correoReserva === "") {

            alert(
                "Por favor, ingresá tu correo electrónico."
            );

            return;

        }

        if (tipoReserva === "") {

            alert(
                "Por favor, seleccioná el tipo de reserva."
            );

            return;

        }

        try {

            const respuesta = await fetch("/reservas", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    nombre: nombreReserva,

                    correo: correoReserva,

                    tipo: tipoReserva

                })

            });


            const datos =
                await respuesta.json();


            if (!respuesta.ok) {

                alert(

                    datos.mensaje ||
                    "No se pudo registrar la solicitud."

                );

                return;

            }

            alert(

                "¡Solicitud registrada correctamente!\n\n" +

                "Nombre: " +
                nombreReserva +
                "\n" +

                "Correo: " +
                correoReserva +
                "\n" +

                "Tipo: " +
                tipoReserva

            );

            formRegistroReserva.reset();

        }

        catch (error) {

            console.error(error);

            alert(

                "No se pudo conectar con el servidor."

            );

        }

    });

}

const btnConsultarReservas =
    document.getElementById("btnConsultarReservas");


const resultadoReservas =
    document.getElementById("resultadoReservas");


if (
    btnConsultarReservas &&
    resultadoReservas
) {

    btnConsultarReservas.addEventListener(
        "click",
        async function () {

            try {

                const respuesta =
                    await fetch("/reservas");

                const datos =
                    await respuesta.json();

                if (!respuesta.ok) {

                    throw new Error(
                        "No se pudieron consultar las reservas."
                    );

                }

                resultadoReservas.innerHTML =

                    "<strong>" +
                    "Solicitudes registradas: " +
                    datos.total +
                    "</strong>";


            }

            catch (error) {

                console.error(error);

                resultadoReservas.innerHTML =

                    "No se pudo consultar " +
                    "la información del sistema.";

            }

        }
    );

}

function calcularFinanciacion() {

    const precio =
        Number(
            document
                .getElementById("precio")
                .value
        );

    const anticipo =
        Number(
            document
                .getElementById("anticipo")
                .value
        );

    const cuotas =
        Number(
            document
                .getElementById("cuotas")
                .value
        );

    if (precio <= 0) {

        alert(
            "Ingresá un precio válido."
        );

        return;

    }

    if (anticipo < 0) {

        alert(
            "El anticipo no puede ser negativo."
        );

        return;

    }


    if (anticipo >= precio) {

        alert(

            "El anticipo debe ser menor " +
            "al precio del vehículo."

        );

        return;

    }

    if (cuotas <= 0) {

        alert(
            "Seleccioná una cantidad válida de cuotas."
        );

        return;

    }

    const saldo =
        precio - anticipo;


    const cuota =
        saldo / cuotas;

    document
        .getElementById("resultado")
        .innerHTML =

        "Monto financiado: $" +

        saldo.toLocaleString("es-AR") +

        "<br><br>" +

        "Valor aproximado de cada cuota:" +

        "<br><strong>$" +

        cuota.toLocaleString("es-AR", {

            minimumFractionDigits: 2,

            maximumFractionDigits: 2

        }) +

        "</strong>";

}

const secciones =
    document.querySelectorAll(".seccion");


if (secciones.length > 0) {

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(

                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0px)";

                        }

                    }

                );

            }

        );

    secciones.forEach(

        (seccion) => {

            seccion.style.opacity = "0";

            seccion.style.transform =
                "translateY(40px)";

            seccion.style.transition =
                "1s";

            observer.observe(seccion);

        }

    );

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const intro =
            document.getElementById("intro");


        if (!intro) return;


        setTimeout(() => {

            intro.classList.add("oculto");

        }, 6000);

    }
);