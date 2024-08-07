const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");
const prisma = require("../db/db.config");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

const strategy = new JwtStrategy(opts,  async (jwt_payload, done)=>{
    user = await prisma.user.findUnique({
        where: {
            id: jwt_payload.id
        }
    })
    if(user){
        return done(null, user)
    }else{
        return done(null, false)
    }
})

module.exports = strategy
