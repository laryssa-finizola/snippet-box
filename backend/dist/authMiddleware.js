import 'dotenv/config';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('O segredo JWT_SECRET não está definido no .env!');
}
export const authMiddleware = (req, res, next) => {
    // frontend envia o token no cabeçalho 'Authorization'
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // 401: Não autorizado --> nem sequer enviou um token
        return res.status(401).json({ error: 'Nenhum token fornecido.' });
    }
    //  separa o "Bearer" do "TOKEN".
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token mal formatado.' });
    }
    const [scheme, token] = parts;
    if (scheme !== 'Bearer') {
        return res.status(401).json({ error: 'Token mal formatado (deve ser Bearer).' });
    }
    try {
        // 3. Verificar se o token é válido, ou seja, se não expirou e se a assinatura bate certo atraves do jwt.verify
        const payload = jwt.verify(token, JWT_SECRET);
        // 4. SUCESSO! --> O utilizador é válido.
        // req recebe as informações do user 
        req.user = payload;
        // 5. pedido passa para a próxima rota
        return next();
    }
    catch (err) {
        // Se 'jwt.verify' falhar (ex: token expirado, assinatura inválida)
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};
