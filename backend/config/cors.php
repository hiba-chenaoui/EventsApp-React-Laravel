<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Allowed HTTP Methods
    |--------------------------------------------------------------------------
    |
    | Here you may specify which HTTP methods are allowed for cross-origin requests.
    | By default, all methods are allowed, but you can restrict them to a specific
    | set of HTTP verbs that you are willing to support, such as GET, POST, etc.
    |
    */
    'allowed_methods' => ['*'],  // Ici, '*' signifie que toutes les méthodes HTTP sont autorisées (GET, POST, PUT, DELETE, etc.)

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | This defines which origins are allowed to make requests to your API. An origin is the combination
    | of the protocol, domain, and port. For local development, you can specify your frontend URL here.
    |
    | Exemples :
    | - Pour un site en local : 'http://localhost:5173' (si tu utilises Vite ou un autre serveur de développement)
    | - Pour une version en production : 'https://ton-site.com'
    |
    */
    'allowed_origins' => [
        'http://localhost:5173',  // Frontend en local (ajuste ce port si nécessaire)
        // 'https://ton-site.com',  // Exemple d'une URL de production à autoriser
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins Patterns
    |--------------------------------------------------------------------------
    |
    | If you need to allow multiple subdomains (e.g. api.example.com, frontend.example.com), you can use regular expressions.
    | C'est souvent utile pour autoriser plusieurs sous-domaines sans spécifier chaque origine individuellement.
    |
    */
    'allowed_origins_patterns' => [
        // 'https://*.example.com',  // Exemple pour autoriser tous les sous-domaines de example.com
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    |
    | Here you can specify which headers are allowed in a CORS request. The default value allows all headers.
    | If you need specific headers (e.g., authorization, content-type), you can list them here.
    |
    */
    'allowed_headers' => ['*'],  // '*' signifie que tous les headers sont autorisés, ce qui est pratique pour le développement

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    |
    | These are the headers that will be exposed to the browser when making a cross-origin request.
    | By default, none are exposed, but you can specify any headers that need to be visible in JavaScript.
    |
    */
    'exposed_headers' => [
        // 'X-Custom-Header',  // Exemple : expose un header personnalisé si nécessaire
    ],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    |
    | This determines how long the results of a preflight request (OPTIONS request) can be cached by the browser.
    | The value is in seconds, and setting it to zero disables caching.
    |
    */
    'max_age' => 3600,  // Le résultat de la requête pré-vol (OPTIONS) sera mis en cache pendant 1 heure

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | This option determines whether or not credentials (cookies, HTTP authentication) are allowed
    | during cross-origin requests. Set this to 'true' if you need to send credentials between frontend and backend.
    |
    */
    'supports_credentials' => true,  // Autorise l'envoi de cookies et d'authentification (utile si tu utilises les sessions ou l'authentification par cookies)
];
