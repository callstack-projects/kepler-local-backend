export const contenTypes = {
    'documentaries': 'documentaries',
    'teams': 'teams',
    'suggestedforyou': 'suggestedforyou',
    'livestreams': 'livestreams',
};

export const documentaries = {
    "itemId": "text",
    "title": "text",
    "thumbnail": "image",
    "description": "text",
    "releaseDate": "text",
    "durationMinutes": "text",
    "director": "text",
    "genre": "text",
    "rating": "text",
    "productionCompany": "text",
    "countryOfOrigin": "text",
    "sportType": "text"
};

export const teams = {
    "itemId": "text",
    "favorite": "boolean",
    "teamLogo": "image",
    "thumbnail": "image",
    "teamName": "text",
    "sportType": "text",
    "coachName": "text",
    "teamColor": "text",
    "homeStadium": "text",
    "seasonStartDate": "text",
    "seasonEndDate": "text"
};

export const suggestedforyou = {
    "itemId": "text",
    "title": "text",
    "streamUrl": "link",
    "thumbnail": "image",
    "network": "text",
    "airDate": "text",
    "genre": "text",
    "rating": "text",
    "sportType": "text"
};

export const livestreams = {
    "itemId": "text",
    "title": "text",
    "headline": "text",
    "sportType": "text",
    "location": "text",
    "streamStartDate": "text",
    "streamEndDate": "text",
    "team1": {
        "name": "text",
        "thumbnail": "image"
    },
    "team2": {
        "name": "text",
        "thumbnail": "image"
    },
    "videoUrl": "link",
    "streamDuration": "text",
    "description": "text",
    "imageCover": "image",
    "isOnAir": "text"
};