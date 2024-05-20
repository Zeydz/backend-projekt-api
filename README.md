# API-projekt

## Beskrivning
Det här API-projektet är en backend-applikation för att hantera restaurangfunktioner. Detta API erbjuder funktionalitet att hantera menyer samt bokningar.

## Installation
1. Klona projektet från GitHub-repositoriet.
2. Navigera till rotkatalogen för projektet.
3. Kör `npm install` för att installera alla nödvändiga paket och beroenden.
4. Skapa en fil med namnet `.env` i rotkatalogen och konfigurera miljövariabler enligt instruktionerna i `.env.example`-filen.

## Användning
1. Starta servern genom att köra kommandot `npm start`.
4. Logga in med en POST-förfrågan till `/api/login` och skicka användarnamn och lösenord som JSON-data i förfrågningskroppen. Ett JWT kommer att returneras om autentiseringen lyckas.
5. Använd det returnerade JWT för att autentisera efterföljande begäranden till skyddade resurser genom att inkludera det som ett Bearer-token i Authorization-headern.

## API-rutter
- `/api/create-admin`: POST-förfrågan för att registrera en ny användare.
- `/api/login`: POST-förfrågan för att logga in och få en JWT.
- `/api/admin-panel`: GET-förfrågan till en skyddad resurs som kräver giltig JWT-autentisering.
- `/api/menu/:id`: GET, POST, DELETE och PUT-förfrågan. Skyddad resurs som kräver JWT-autentisering av POST, DELETE och PUT.
- `/api/bookings/:id`: GET, POST och DELETE för reservationer. Skyddad resurs som kräver JWT-autentisering av GET, POST och DELETE

## Struktur
För att logga in/registrera används följande struktur:
```
{
   "username": "namn",
   "password": "lösenord"
}
```

## Miljövariabler
- `PORT`: Porten som servern ska lyssna på.
- `DATABASE`: Adress till MongoDB-databasen.
- `JWT_SECRET_KEY`: Hemlig nyckel för att signera och verifiera JWT.

  
[Webbplats](https://main--teal-zuccutto-d6236d.netlify.app/)
