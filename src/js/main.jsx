import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'

// components
import Home from './components/Home';
import SecondsCounter from './components/SecondsCounter';

const root = ReactDOM.createRoot(document.getElementById('root'));
let intervalo = null;
let segundos = 0;
let tipoDeConteo = '';
let conteoRegresivo = 0;
let conteoIniciado = true;

const iniciarContador = () => {
  if (intervalo !== null) { clearInterval(intervalo); }
  intervalo = setInterval(() => {
    renderizado();
    if (tipoDeConteo === 'regresivo' && conteoRegresivo - segundos === 0) { clearInterval(intervalo); }
    segundos++;
  }, 1000)
}

const pararContador = () => {
  clearInterval(intervalo);
  conteoIniciado = false;
}

const resumirContador = () => {
  if (!conteoIniciado) {
    conteoIniciado = true;
    iniciarContador();
  }
}

const reiniciarContador = (type, value) => {
  tipoDeConteo = type;
  if (tipoDeConteo === 'normal') conteoRegresivo = 0;
  if (tipoDeConteo === 'regresivo') conteoRegresivo = value;
  segundos = 0;
  renderizado();
  segundos++;
  iniciarContador();
}

const renderizado = () => {
  root.render(
    <React.StrictMode>
      <SecondsCounter
        contador={segundos}
        conteo={conteoRegresivo}
        detener={pararContador}
        resumir={resumirContador}
        reiniciar={reiniciarContador} />
    </React.StrictMode>,
  )
}

iniciarContador();
