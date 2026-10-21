let MAX_PROF = 4
//  Cada triángulo es una lista de puntos [x, y], del más grande al más chico
let TRIANGULOS = [[[2, 0], [1, 1], [3, 1], [1, 2], [3, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]], [[2, 2], [1, 3], [2, 3], [3, 3]], [[2, 3]]]
function ramificar(prof: number, x: number, y: number) {
    let brillo = pins.map(prof, 0, MAX_PROF, 255, 60)
    led.plotBrightness(x, y, brillo)
    basic.pause(pins.map(prof, 0, MAX_PROF, 100, 400))
    if (prof >= MAX_PROF) {
        return
    }
    
    if (x > 0) {
        ramificar(prof + 1, x - 1, y - 1)
    }
    
    if (x < 4) {
        ramificar(prof + 1, x + 1, y - 1)
    }
    
}

function parpadear(veces: number) {
    for (let i = 0; i < veces; i++) {
        led.setBrightness(0)
        basic.pause(150)
        led.setBrightness(255)
        basic.pause(150)
    }
}

function dibujar_triangulos(nivel: number) {
    //  Caso base: ya no quedan triángulos más chicos
    if (nivel >= TRIANGULOS.length) {
        return
    }
    
    let brillo = pins.map(nivel, 0, 2, 80, 255)
    for (let p of TRIANGULOS[nivel]) {
        led.plotBrightness(p[0], p[1], brillo)
    }
    basic.pause(600)
    //  Caso recursivo: el siguiente triángulo, más adentro
    dibujar_triangulos(nivel + 1)
}

function arbol() {
    basic.clearScreen()
    ramificar(0, 2, 4)
    parpadear(3)
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    arbol()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.clearScreen()
    dibujar_triangulos(0)
})
arbol()
