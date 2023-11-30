import pygame, json, PIL.Image

with open("setup.json") as file:
    setup = json.load(file)

pygame.init()
display = pygame.display.set_mode((500, 500))
clock = pygame.time.Clock()
info = pygame.display.Info()
pygame.display.set_caption("the smart barn")


richtlijnen = {
    
}
unitRange = setup["range"]

XasVerschil = unitRange["x-as"][1] - unitRange["x-as"][0]
unitXas = 500 / XasVerschil

YasVerschil = unitRange["y-as"][1] - unitRange["y-as"][0]
unitYas = 500 / YasVerschil

tempGoed = setup["range"]["goed"]


ideaalVlak = []
behaagelijkVlak = []


def maakPunt(vlak, range):
    puntInVlak = []
    for punt in range:
        x = (punt[0] - unitRange["x-as"][0]) * unitXas 
        y =  500 - (punt[1] * unitYas)
        
        puntInVlak.append(x)
        
        
        puntInVlak.append(y)
        
        vlak.append(puntInVlak)
        puntInVlak = []
    return vlak

ideaalVlak = maakPunt(ideaalVlak, setup["range"]["goed"])
behaagelijkVlak = maakPunt(behaagelijkVlak, setup["range"]["matig"])
print(ideaalVlak)   
print(behaagelijkVlak)    

while True:
    clock.tick(10)
    display.fill(richtlijnen["slecht"]["kleur"])
    
    
    pygame.draw.polygon(display, richtlijnen["matig"]["kleur"], behaagelijkVlak)

    rect = pygame.draw.polygon(display, richtlijnen["goed"]["kleur"], ideaalVlak)
    
    a = pygame.image.tostring(display, 'RGB')
    
    b = PIL.Image.frombytes('RGB', (info.current_w, info.current_h), a)
    
    puntPos = pygame.mouse.get_pos()
    
    if b.getpixel(puntPos) == (0, 255, 0): 
        print("goede omgeving")
    
    if b.getpixel(puntPos) == (255, 255, 0):
        print("matige omgeving")
        
    if b.getpixel(puntPos) == (255, 0, 0):
        print("slechte omgeving")
    
    pygame.draw.circle(display, (0,0,0), puntPos, 3)
    
   
    # center = (rect.width,rect.height)
    # pygame.draw.circle(display, (255, 255, 255), center, 5)    
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
    pygame.display.flip()