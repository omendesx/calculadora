let value1;
let value2;
let displayValue = '0';
let aguardandoSegundo;
let Operador = null;


const display = document.getElementById('visor');
function Sendnumber(x) {
    console.log(x)
}

function UpdateDisplay() {
    display.value = displayValue;
}

function AdicionarNumero(numero) {
    if (aguardandoSegundo) {
        displayValue = '';
        aguardandoSegundo = false;
    }

    if (displayValue === '0' && numero === 0) return;

    if (displayValue === '0' && numero !== '.') {
        displayValue = numero.toString();
    } else {
        displayValue += numero.toString();
    }

    UpdateDisplay();
}

function AdicionarDecimal() {
    if (aguardandoSegundo) {
        displayValue = '0';
        aguardandoSegundo = false;
    }
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    UpdateDisplay();
}

function Limpar() {
    displayValue = '0';
    value1 = null;
    Operador = null;
    aguardandoSegundo = false;

    UpdateDisplay();
}

function apagar() {
    if (aguardandoSegundo) return;
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    UpdateDisplay();
}

function Calcular() {
    if (Operador === null || value1 === null) return;
    const Segundo = parseFloat(displayValue);
    let Resultado;

    switch (Operador) {
        case '+':
            Resultado = value1 + Segundo;
            break;
        case '-':
            Resultado = value1 - Segundo;
            break;
        case 'x':
            Resultado = value1 * Segundo;
            break;
        case '/':
            if (Segundo === 0) {
                alert('Erro: Divisão por zero!');
                Limpar();
                return;
            }
            Resultado = value1 / Segundo;
            break;
        default:
            return;
    }

    parseFloat(Resultado.toFixed(8));

    displayValue = Resultado.toString();
    value1 = Resultado;
    Operador = null;
    aguardandoSegundo = true;
    UpdateDisplay();
}

function SetOperador(op) {
    if (Operador !== null && !aguardandoSegundo) {
        calcular();
    }
    value1 = parseFloat(displayValue);
    Operador = op;
    aguardandoSegundo = true;
}

function Sendnumber(x) {
    console.log("Botão pressionado:", x);

    // Verifica se é número (0-9)
    if (x >= '0' && x <= '9') {
        AdicionarNumero(x);
    }
    // Verifica se é vírgula/ponto decimal
    else if (x === ',' || x === '.') {
        AdicionarDecimal();
    }
    // Verifica se é operador
    else if (x === '+' || x === '-' || x === 'x' || x === '/') {
        SetOperador(x);
    }
    // Verifica se é igual
    else if (x === '=') {
        Calcular();
    }
    // Verifica se é limpar (C)
    else if (x === 'C') {
        Limpar();
    }
    // Verifica se é limpar entrada (CE - também usa LimparTudo)
    else if (x === 'CE') {
        Limpar();
    }
    // Verifica se é para apagar último caractere
    else if (x === '⌫') {
        Apagar();
    }
}
// Inicializar display
UpdateDisplay();