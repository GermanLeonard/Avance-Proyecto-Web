const register = (req, res) => {
    res.send('Registrado correctamente');
  };
  
  const login = (req, res) => {
    res.send('Inicio de sesión exitoso');
  };
  
  module.exports = { register, login };
  