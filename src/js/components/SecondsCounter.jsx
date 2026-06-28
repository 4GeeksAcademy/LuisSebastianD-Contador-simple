import { useState } from "react";

const SecondsCounter = (props) => {

    const [alertTime, setAlertTime] = useState(0);
    const [reverseCount, setReverseCount] = useState(0);
    const [countType, setCountType] = useState('normal');
    const [activeAlert, setActiveAlert] = useState(null);

    const crearAlerta = () => {
        clearTimeout(activeAlert);
        if ((countType === 'normal' && alertTime < segundos()) || (countType === 'regresivo' && alertTime > segundos())) {
            alert('Fuera del rango');
        }
        else {
            setActiveAlert(
                setTimeout(() => {
                    alert(`Alcanzó el tiempo: ${alertTime}`);
                }, Math.abs(alertTime - segundos()) * 1000)
            )
        }
    }

    const segundos = () => {
        return props.conteo > 0 ? props.conteo - props.contador : props.contador;
    }

    return (
        <div className=" container text-center">
            <div className="row bg-dark text-white justify-content-center display-2 fw-medium py-4 mt-3">
                <div className="col-1">
                    <i className="fa-regular fa-clock"></i>
                </div>
                <div className="col-1">
                    {Math.floor(segundos() / 36000) % 10}
                </div>
                <div className="col-1">
                    {Math.floor(segundos() / 3600) % 10}
                </div>:
                <div className="col-1">
                    {Math.floor(segundos() / 600) % 6}
                </div>
                <div className="col-1">
                    {Math.floor(segundos() / 60) % 10}
                </div>:
                <div className="col-1">
                    {Math.floor(segundos() / 10) % 6}
                </div>
                <div className="col-1">
                    {segundos() % 10}
                </div>
            </div>
            <div className="row mt-5 justify-content-center">
                <div className="col-6 d-flex justify-content-center">
                    <div className="form-check w-25">
                        <input type="radio" className="form-check-input" style={{ borderColor: 'black' }}
                            id="conteoNormal" name="tipoDeConteo" value={'normal'}
                            checked={countType === 'normal'} onChange={() => setCountType('normal')} />
                        <label className="form-check-label" htmlFor="conteoNormal">Contador simple</label>
                    </div>
                </div>
                <div className="col-6 d-flex justify-content-center">
                    <div className="form-check me-4 w-25">
                        <input type="radio" className="form-check-input" style={{ borderColor: 'black' }}
                            id="conteoRegresivo" name="tipoDeConteo" value={'regresivo'}
                            checked={countType === 'regresivo'} onChange={() => setCountType('regresivo')} />
                        <label className="form-check-label" htmlFor="conteoRegresivo">Cuenta regresiva</label>
                    </div>
                    <label htmlFor="regresivo">Ingresar segundos:</label>
                    <input type="number" id="regresivo" className="ms-1" onChange={(event) => setReverseCount(event.target.value)} />
                </div>
            </div>
            <div className="row justify-content-center my-5">
                <div className="col-1">
                    <button type="button" className="btn btn-danger w-100" onClick={props.detener}>
                        Parar
                    </button>
                </div>
                <div className="col-1">
                    <button type="button" className="btn btn-success w-100" onClick={props.resumir}>
                        Resumir
                    </button>
                </div>
                <div className="col-1">
                    <button type="button" className="btn btn-primary w-100" onClick={() => props.reiniciar(countType, reverseCount)}>
                        Reiniciar
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="alert">Ingresar segundos:</label>
                    <input type="number" id="alert" className="ms-1" onChange={(event) => setAlertTime(event.target.value)} />
                    <button type="button" className="btn btn-secondary ms-4" onClick={crearAlerta}>Crear alerta</button>
                </div>
            </div>

        </div>
    )
}

export default SecondsCounter;