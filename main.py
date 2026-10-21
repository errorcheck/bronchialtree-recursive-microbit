MAX_PROF = 4

# Cada triángulo es una lista de puntos [x, y], del más grande al más chico
TRIANGULOS = [
    [[2,0],[1,1],[3,1],[1,2],[3,2],[0,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]],
    [[2,2],[1,3],[2,3],[3,3]],
    [[2,3]]
]

def ramificar(prof, x, y):
    brillo = pins.map(prof, 0, MAX_PROF, 255, 60)
    led.plot_brightness(x, y, brillo)
    basic.pause(pins.map(prof, 0, MAX_PROF, 100, 400))

    if prof >= MAX_PROF:
        return

    if x > 0:
        ramificar(prof + 1, x - 1, y - 1)
    if x < 4:
        ramificar(prof + 1, x + 1, y - 1)

def parpadear(veces):
    for i in range(veces):
        led.set_brightness(0)
        basic.pause(150)
        led.set_brightness(255)
        basic.pause(150)

def dibujar_triangulos(nivel):
    # Caso base: ya no quedan triángulos más chicos
    if nivel >= len(TRIANGULOS):
        return
    brillo = pins.map(nivel, 0, 2, 80, 255)
    for p in TRIANGULOS[nivel]:
        led.plot_brightness(p[0], p[1], brillo)
    basic.pause(600)
    # Caso recursivo: el siguiente triángulo, más adentro
    dibujar_triangulos(nivel + 1)

def arbol():
    basic.clear_screen()
    ramificar(0, 2, 4)
    parpadear(3)

def on_button_pressed_a():
    arbol()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    basic.clear_screen()
    dibujar_triangulos(0)
input.on_button_pressed(Button.B, on_button_pressed_b)

arbol()
