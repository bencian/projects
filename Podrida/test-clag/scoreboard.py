class Player:
    name = ''
    dealer = False
    prediction = -1
    points = 0

    def __init__(self,name):
        self.dealer = False
        self.prediction = -1
        self.name = name

def confirmation( reason ):
    confirmed = False;
    while(not(confirmed)):
        confirmation_reason = input(reason)
        confirmation = input("Seguro? [Si/No]: ")
        if ((confirmation == "S")or(confirmation == "s")or(confirmation == "si")or(confirmation == "Si")or(confirmation == "SI")):
            confirmed = True;
        else:
            confirmed = False;
    return confirmation_reason


print('---------------------------------------------------------------')
print('                                                               ')
amount_of_players = confirmation("Cuantos juegan?: ")
rounds = confirmation("Cuantas rondas?: ")
print('                                                               ')
print('---------------------------------------------------------------')
print("Jugadores: " + amount_of_players)
print("Cantidad de rondas: " + rounds)
print('---------------------------------------------------------------')
print('                                                               ')
players = []
print('--El jugador que reparte primero debe ingresar su nombre último--')
print('                                                               ')
for i in range(int(amount_of_players)):
    name = confirmation('Ingrese el nombre del jugador '+str(i+1) +': ')
    player_i = Player(name)
    players.append(player_i)
print('----------------------Empieza la partida ----------------------')
for round in range(int(rounds)):
    print('--------------------------Nueva ronda--------------------------')
    players[-1].dealer = True
    print('Reparte '+ players[-1].name)
    cards = confirmation('Cuantas cartas en esta ronda?: ')
    amount_predicted = 0
    print("-------------------------predicciones:-------------------------")
    print('                                                               ')
    for player in players:
        prediction = confirmation('Cuantas rondas ganara '+ player.name +'?: ')
        while((player.dealer) and (amount_predicted + int(prediction) == int(cards))):
            print(player.name + ", no podes pedir " + prediction)
            print('                                                               ')
            prediction = confirmation('Cuantas rondas ganara '+ player.name +'?: ')
        amount_predicted = amount_predicted + int(prediction)
        player.prediction = int(prediction)
        print('------------------------Próximo jugador -----------------------')    
    print('                                                               ')
    print("-----------------------------Jugando---------------------------")
    for player in players:
        points = 0
        hands_won = confirmation('Cuantas manos gano '+player.name+'?: ')
        if(int(hands_won) == int(player.prediction)):
            if(int(player.prediction)>3):
                print('Bonuuuuus')
                points = 20
            else:
                points = 10
        points = points + int(hands_won)
        player.points = points + player.points
    players[-1].dealer = False
    next_dealer = players.pop(0)
    players.append(next_dealer)
    print("----------------------------Puntajes:--------------------------")
    for player in players:
        print(player.name + ' acumula '+ str(player.points) + ' puntos!')
    print("-----------------------Terminó la ronda------------------------")
print("----------------------Terminó la partida ----------------------")
winner = ''
winner_points = 0
for player in players:
    if(player.points>winner_points):
        winner = player.name
        winner_points = player.points
print('---------------------------------------------------------------')
print('                                                               ')
print('--Felicidades ' + winner + ', ganaste con un total de '+ str(winner_points)+' puntos!--')
print('                                                               ')
print('---------------------------------------------------------------')