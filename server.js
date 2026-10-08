require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.static(__dirname));

const reservas = [];

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error) => {

    if (error) {

        console.log("");
        console.log("========================================");
        console.log(" GMAIL");
        console.log("========================================");
        console.log("No se pudo conectar con Gmail.");
        console.log("Revisá EMAIL_USER y EMAIL_PASS.");
        console.log(error.message);
        console.log("");

    } else {

        console.log("");
        console.log("========================================");
        console.log(" GMAIL CONECTADO CORRECTAMENTE");
        console.log("========================================");
        console.log("");

    }

});

function generarId() {

    return Date.now().toString();

}

async function enviarCorreo(
    destinatario,
    asunto,
    contenido
) {

    await transporter.sendMail({

        from: `"BMW PROJECT" <${process.env.EMAIL_USER}>`,

        to: destinatario,

        subject: asunto,

        text: contenido

    });

}

app.post("/test-drive", async (req, res) => {

    try {

        const {
            nombre,
            correo,
            modelo,
            fecha
        } = req.body;


        if (
            !nombre ||
            !correo ||
            !modelo ||
            !fecha
        ) {

            return res.status(400).json({

                mensaje:
                    "Faltan datos obligatorios para reservar el Test Drive."

            });

        }


        const reserva = {

            id: generarId(),

            tipo: "Test Drive",

            nombre,

            correo,

            modelo,

            fecha,

            estado: "Pendiente",

            fechaRegistro:
                new Date().toLocaleString("es-AR")

        };


        reservas.push(reserva);


        console.log("");
        console.log("Nueva reserva de Test Drive:");
        console.log(reserva);

        await enviarCorreo(

            process.env.OWNER_EMAIL,

            "Nueva reserva de Test Drive - BMW PROJECT",

            `
Nueva reserva de Test Drive.

Nombre: ${nombre}

Correo: ${correo}

Modelo: ${modelo}

Fecha: ${fecha}

Estado: Pendiente

BMW PROJECT
            `

        );

        await enviarCorreo(

            correo,

            "Confirmación de Test Drive - BMW PROJECT",

            `
Hola ${nombre}.

Tu reserva de Test Drive fue registrada correctamente.

Modelo: ${modelo}

Fecha: ${fecha}

Nos pondremos en contacto con vos para confirmar el turno.

BMW PROJECT
            `

        );


        res.json({

            mensaje:
                "Test Drive registrado y correos enviados correctamente.",

            reserva

        });


    } catch (error) {

        console.error(
            "Error en Test Drive:",
            error.message
        );


        res.status(500).json({

            mensaje:
                "La reserva fue registrada, pero ocurrió un error al enviar el correo."

        });

    }

});

app.post("/service", async (req, res) => {

    try {

        const {
            nombre,
            correo,
            modelo,
            fecha,
            tipoService
        } = req.body;


        if (
            !nombre ||
            !correo ||
            !modelo ||
            !fecha ||
            !tipoService
        ) {

            return res.status(400).json({

                mensaje:
                    "Faltan datos obligatorios para reservar el Service."

            });

        }


        const reserva = {

            id: generarId(),

            tipo: "Service",

            nombre,

            correo,

            modelo,

            fecha,

            servicio: tipoService,

            estado: "Pendiente",

            fechaRegistro:
                new Date().toLocaleString("es-AR")

        };


        reservas.push(reserva);


        console.log("");
        console.log("Nuevo turno de Service:");
        console.log(reserva);


        await enviarCorreo(

            process.env.OWNER_EMAIL,

            "Nuevo turno de Service - BMW PROJECT",

            `
Nuevo turno de Service.

Nombre: ${nombre}

Correo: ${correo}

Modelo: ${modelo}

Fecha: ${fecha}

Servicio solicitado: ${tipoService}

Estado: Pendiente

BMW PROJECT
            `

        );


        await enviarCorreo(

            correo,

            "Confirmación de Service - BMW PROJECT",

            `
Hola ${nombre}.

Tu turno de Service fue registrado correctamente.

Modelo: ${modelo}

Fecha: ${fecha}

Servicio: ${tipoService}

Nos pondremos en contacto con vos para confirmar el turno.

BMW PROJECT
            `

        );


        res.json({

            mensaje:
                "Turno de Service registrado y correos enviados correctamente.",

            reserva

        });


    } catch (error) {

        console.error(
            "Error en Service:",
            error.message
        );


        res.status(500).json({

            mensaje:
                "El turno fue registrado, pero ocurrió un error al enviar el correo."

        });

    }

});

app.post("/contacto", async (req, res) => {

    try {

        const {
            nombre,
            correo,
            asunto,
            mensaje
        } = req.body;


        if (
            !nombre ||
            !correo ||
            !asunto ||
            !mensaje
        ) {

            return res.status(400).json({

                mensaje:
                    "Completá todos los campos del formulario."

            });

        }


        const contacto = {

            id: generarId(),

            tipo: "Contacto",

            nombre,

            correo,

            asunto,

            mensaje,

            fecha:
                new Date().toLocaleString("es-AR")

        };


        reservas.push(contacto);


        console.log("");
        console.log("Nuevo mensaje de contacto:");
        console.log(contacto);


        await enviarCorreo(

            process.env.OWNER_EMAIL,

            `Nueva consulta: ${asunto} - BMW PROJECT`,

            `
Nuevo mensaje recibido desde BMW PROJECT.

Nombre: ${nombre}

Correo: ${correo}

Asunto: ${asunto}

Mensaje:

${mensaje}

Fecha: ${contacto.fecha}
            `

        );


        await enviarCorreo(

            correo,

            "Consulta recibida - BMW PROJECT",

            `
Hola ${nombre}.

Recibimos correctamente tu consulta.

Asunto: ${asunto}

Nos pondremos en contacto con vos próximamente.

BMW PROJECT
            `

        );


        res.json({

            mensaje:
                "Consulta enviada correctamente.",

            contacto

        });


    } catch (error) {

        console.error(
            "Error en contacto:",
            error.message
        );


        res.status(500).json({

            mensaje:
                "El mensaje fue registrado, pero ocurrió un error al enviar el correo."

        });

    }

});

app.post("/whatsapp", (req, res) => {

    try {

        const {
            nombre,
            mensaje
        } = req.body;


        if (!nombre || !mensaje) {

            return res.status(400).json({

                mensaje:
                    "Faltan datos para generar el mensaje de WhatsApp."

            });

        }

        const whatsapp = {

            id: generarId(),

            tipo: "WhatsApp",

            nombre,

            mensaje,

            fecha:
                new Date().toLocaleString("es-AR")

        };


        reservas.push(whatsapp);


        console.log("");
        console.log("Solicitud de WhatsApp:");
        console.log(whatsapp);


        res.json({

            mensaje:
                "Mensaje de WhatsApp preparado correctamente.",

            whatsapp

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            mensaje:
                "No se pudo preparar el mensaje de WhatsApp."

        });

    }

});

app.post("/reservas", async (req, res) => {

    try {

        const {
            nombre,
            correo,
            tipo
        } = req.body;


        if (
            !nombre ||
            !correo ||
            !tipo
        ) {

            return res.status(400).json({

                mensaje:
                    "Completá todos los datos de la reserva."

            });

        }

        const nuevaReserva = {

            id: generarId(),

            tipo,

            nombre,

            correo,

            estado: "Registrada",

            fechaRegistro:
                new Date().toLocaleString("es-AR")

        };


        reservas.push(nuevaReserva);


        console.log("");
        console.log("Nueva reserva general:");
        console.log(nuevaReserva);


        await enviarCorreo(

            process.env.OWNER_EMAIL,

            "Nueva reserva general - BMW PROJECT",

            `
Nueva reserva general.

Nombre: ${nombre}

Correo: ${correo}

Tipo: ${tipo}

Fecha de registro:
${nuevaReserva.fechaRegistro}

BMW PROJECT
            `

        );


        res.json({

            mensaje:
                "Reserva registrada correctamente.",

            reserva: nuevaReserva

        });


    } catch (error) {

        console.error(
            "Error al registrar reserva:",
            error.message
        );


        res.status(500).json({

            mensaje:
                "No se pudo registrar la reserva."

        });

    }

});

app.get("/reservas", (req, res) => {

    res.json({

        total: reservas.length,

        reservas

    });

});

app.get("/estado", (req, res) => {

    res.json({

        proyecto: "BMW PROJECT",

        estado: "online",

        backend: "funcionando",

        gmail:
            Boolean(process.env.EMAIL_USER),

        whatsapp:
            Boolean(process.env.WHATSAPP_NUMBER),

        reservas:
            reservas.length

    });

});

app.get("/", (req, res) => {

    res.sendFile(
        __dirname + "/index.html"
    );

});

app.listen(PORT, () => {

    console.log("");

    console.log("========================================");

    console.log(" BMW PROJECT");

    console.log(" SERVIDOR BACKEND");

    console.log("========================================");

    console.log("");

    console.log(
        `Página: http://localhost:${PORT}`
    );

    console.log("");

    console.log("Rutas backend:");

    console.log("POST /test-drive");

    console.log("POST /service");

    console.log("POST /contacto");

    console.log("POST /whatsapp");

    console.log("POST /reservas");

    console.log("GET  /reservas");

    console.log("GET  /estado");

    console.log("");

});