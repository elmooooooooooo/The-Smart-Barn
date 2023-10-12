import pygame, json, PIL.Image

with open("setup.json") as file:
    setup = json.load(file)

pygame.init()
display = pygame.display.set_mode((500, 500))
clock = pygame.time.Clock()
info = pygame.display.Info()


richtlijnen = {
    "goed": {
        "kleur": (0,255,0)
    },
    "matig": {
        "kleur": (255, 255, 0)
    },
    "slecht": {
        "kleur": (255, 0, 0)
    }
}
unitRange = setup["range"]

XasVerschil = unitRange["x-as"][1] - unitRange["x-as"][0]
unitXas = 500 / XasVerschil

YasVerschil = unitRange["y-as"][1] - unitRange["y-as"][0]
unitYas = 500 / YasVerschil

tempGoed = setup["range"]["goed"]

while True:
    clock.tick(10)
    display.fill((255,255,255))

    test = pygame.draw.polygon(display, richtlijnen["goed"]["kleur"], (( (tempGoed[0][0] - 12) * 31.25  , 500 - tempGoed[0][1] * 5), 
                                                                ((tempGoed[1][0] - 12) * 31.25,  500 - tempGoed[1][1] * 5), 
                                                                (  (tempGoed[2][0] - 12) * 31.25, 500 -tempGoed[2][1] * 5), 
                                                                ( (tempGoed[3][0] - 12) * 31.25, 500 - tempGoed[3][1] * 5)))
    
    a = pygame.image.tostring(display, 'RGB')
    
    b = PIL.Image.frombytes('RGB', (info.current_w, info.current_h), a)
    
    try:
        print(b.getpixel(pygame.mouse.get_pos()) == (0, 255, 0))
    except:
        print(False)
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
    pygame.display.flip()