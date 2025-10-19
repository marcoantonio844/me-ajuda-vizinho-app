const jwt = require('jsonwebtoken');
const authSecret = 'meajudavizinhosecret123456'; 

function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Nenhum token fornecido.' });
  }

  
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return response.status(401).json({ error: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: 'Token mal formatado.' });
  }

  jwt.verify(token, authSecret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Token inválido.' });
    }

   
    request.userId = decoded.id;
    return next(); // Permite que a requisição continue para o controller
  });
}

module.exports = authMiddleware;