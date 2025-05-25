// Gestión Asíncrona de una Veterinaria 

// ===================== Datos =====================
let duenos = [];
let mascotas = [];
let IdDueno = 1;
let IdMascota = 1;

const estadosPermitidos = ["Sano", "Enfermo", "En tratamiento"];
const especiesPermitidas = ["Perro", "Gato", "Ave", "Reptil", "Otro"];


function registrarDuenoAsincrono(callback) {
    alert("****** REGISTRO DE PROPIETARIO DE LA MASCOTA *******");
    const nombre = prompt("Ingrese el nombre: ");
    const cedula = prompt("Ingrese la cédula: ");
    const telefono = prompt("Ingrese el teléfono: ");
    const correo = prompt("Ingrese el correo: ");

    if (!nombre || !cedula || !telefono || !correo) {
        alert("Todos los campos son obligatorios");
        return;
    }

    setTimeout(() => {
        duenos.push({ id: IdDueno++, nombre, cedula, telefono, correo });
        alert("Dueño registrado con éxito (validación simulada)");
        callback?.();
    }, 1500);
}

function registrarMascotaAsincrono(callback) {
    alert("****** REGISTRO DE LA MASCOTA *******");
    const nombre = prompt("Ingrese el nombre: ");
    const especie = prompt("Ingrese la especie (Perro, Gato, Ave, Reptil, Otro): ");
    const edad = Number(prompt("Ingrese la edad en años: "));
    const peso = Number(prompt("Ingrese el peso en kg: "));
    const estado = prompt("Ingrese el estado de salud (Sano, Enfermo, En tratamiento): ");
    const cedulaDueno = prompt("Ingrese la cédula del dueño: ");

    if (!nombre || !especie || edad <= 0 || peso <= 0 || !estado || !cedulaDueno) {
        alert("Todos los campos son obligatorios y deben tener valores válidos");
        return;
    }

    if (!especiesPermitidas.includes(especie)) {
        alert("Especie inválida");
        return;
    }

    if (!estadosPermitidos.includes(estado)) {
        alert("Estado de salud inválido");
        return;
    }

    setTimeout(() => {
        const dueno = duenos.find(d => d.cedula === cedulaDueno);
        if (!dueno) {
            alert("Dueño no encontrado (validación demorada)");
            return;
        }
        mascotas.push({ id: IdMascota++, nombre, especie, edad, peso, estado, idDueno: dueno.id });
        alert("Mascota registrada con éxito (verificación de dueño completada)");
        callback?.();
    }, 2000);
}

function listarMascotas() {
    if (mascotas.length === 0) return alert("No hay mascotas registradas");

    let mensaje = "***** LISTADO DE MASCOTAS *****\n\n";
    mascotas.forEach(m => {
        const dueno = duenos.find(d => d.id === m.idDueno);
        mensaje += `Nombre: ${m.nombre}\n`;
        mensaje += `Especie: ${m.especie}\n`;
        mensaje += `Edad: ${m.edad} años\n`;
        mensaje += `Peso: ${m.peso} kg\n`;
        mensaje += `Estado: ${m.estado}\n`;
        mensaje += `Dueño: ${dueno ? dueno.nombre : "Desconocido"}\n`;
        mensaje += "-------------------------\n";
    });

    alert(mensaje);
}

function buscarMascotaAsincrona() {
    const nombre = prompt("Ingrese el nombre de la mascota a buscar:");
    if (!nombre) {
        alert("Debe ingresar un nombre");
        return;
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (mascota) resolve(mascota);
            else reject("Mascota no encontrada");
        }, 1500);
    })
        .then(mascota => {
            const dueno = duenos.find(d => d.id === mascota.idDueno);
            let mensaje = `Datos de la mascota:\n\n`;
            mensaje += `Nombre: ${mascota.nombre}\n`;
            mensaje += `Especie: ${mascota.especie}\n`;
            mensaje += `Edad: ${mascota.edad} años\n`;
            mensaje += `Peso: ${mascota.peso} kg\n`;
            mensaje += `Estado: ${mascota.estado}\n`;
            mensaje += `Dueño: ${dueno ? dueno.nombre : "Desconocido"}\n`;
            alert(mensaje);
        })
        .catch(error => alert(error));
}

async function actualizarEstadoSaludAsincrono() {
    const nombre = prompt("Ingrese el nombre de la mascota a actualizar:");
    if (!nombre) {
        alert("Debe ingresar un nombre");
        return;
    }

    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
    if (!mascota) {
        alert("Mascota no encontrada");
        return;
    }

    const nuevoEstado = prompt(`Ingrese el nuevo estado de salud (${estadosPermitidos.join(", ")}):`);
    if (!estadosPermitidos.includes(nuevoEstado)) {
        alert("Estado inválido");
        return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    mascota.estado = nuevoEstado;
    alert("Estado de salud actualizado con éxito (espera simulada)");
}

function eliminarMascotaAsincrona() {
    const nombre = prompt("Ingrese el nombre de la mascota a eliminar:");
    if (!nombre) {
        alert("Debe ingresar un nombre");
        return;
    }

    new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (index === -1) {
                reject("Mascota no encontrada");
            } else {
                mascotas.splice(index, 1);
                resolve("Mascota eliminada con éxito (confirmación tras 2 segundos)");
            }
        }, 2000);
    })
        .then(mensaje => alert(mensaje))
        .catch(error => alert(error));
}

async function verMascotasPorDuenoAsincrono() {
    const cedula = prompt("Ingrese la cédula del dueño:");
    if (!cedula) {
        alert("Debe ingresar una cédula");
        return;
    }

    const dueno = duenos.find(d => d.cedula === cedula);
    if (!dueno) {
        alert("Dueño no encontrado");
        return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const lista = mascotas.filter(m => m.idDueno === dueno.id);
    if (lista.length === 0) {
        alert("Este dueño no tiene mascotas registradas");
        return;
    }

    let mensaje = `Mascotas de ${dueno.nombre}:\n\n`;
    lista.forEach(m => {
        mensaje += `Nombre: ${m.nombre}, Especie: ${m.especie}, Edad: ${m.edad} años, Estado: ${m.estado}\n`;
    });
    alert(mensaje);
}

// ===================== Menú Principal =====================

async function menu() {
    let opcion;
    do {
        opcion = prompt(`Seleccione una opción:
1. Registrar un nuevo dueño
2. Registrar una nueva mascota
3. Listar todas las mascotas
4. Buscar una mascota por nombre
5. Actualizar el estado de salud de una mascota
6. Eliminar una mascota por nombre
7. Ver mascotas de un dueño (por cédula)
8. Salir`);

        if (!opcion) {
            alert("Debe seleccionar una opción");
            continue;
        }

        switch (opcion) {
            case "1":
                await new Promise(resolve => registrarDuenoAsincrono(resolve));
                break;
            case "2":
                await new Promise(resolve => registrarMascotaAsincrono(resolve));
                break;
            case "3":
                listarMascotas();
                break;
            case "4":
                await buscarMascotaAsincrona();
                break;
            case "5":
                await actualizarEstadoSaludAsincrono();
                break;
            case "6":
                await eliminarMascotaAsincrona();
                break;
            case "7":
                await verMascotasPorDuenoAsincrono();
                break;
            case "8":
                alert("¡Gracias por usar la app veterinaria!");
                break;
            default:
                alert("Opción inválida");
        }
    } while (opcion !== "8");
}

menu();