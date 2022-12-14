var caixaChave = document.querySelector(".caixaChave");

transicao = document.addEventListener("click", function () {
  var selection = document.querySelector("#tipo_cripto").value;
  if (selection == "cifra_de_cesar") {
    caixaChave.style.display = "block";
  } else {
    caixaChave.style.display = "none";
  }
});

var radio = document.querySelectorAll(".radio"); // radio codificar decodificar
var botao = document.querySelector(".button"); // botão final do resultado
var resultado = document.querySelector(".resultado");
var chave = document.querySelector("#chave");
var text = document.querySelector("#text");

botao.addEventListener("click", function (event) {
  event.preventDefault();
  var selection = document.querySelector("#tipo_cripto").value;
  if (radio[0].checked && selection == "cifra_de_cesar") {
    var valorTexto = text.value.split("");
    var valorChave = parseInt(chave.value);
    resultado.value = codifica(valorTexto, valorChave);
  } else if (radio[1].checked && selection == "cifra_de_cesar") {
    var valorTexto = text.value.split("");
    var valorChave = parseInt(chave.value);
    resultado.value = decodifica(valorTexto, valorChave);
  } else if (radio[0].checked && selection == "base64") {
    var valorTexto = text.value;
    resultado.value = btoa(valorTexto);
  } else {
    var valorTexto = text.value;
    resultado.value = atob(valorTexto);
  }
});

function codifica(texto, chave) {
  // igor,2
  return texto
    .map((teste) => {
      //return texto.map(map é um for que rodas todos itens do  array executando uma função) == ARRAY QUE VEIO DO SPLIT ['i','g','o','r']
      //parâmetro teste é a variável que vai testar cada item do array no algoritmo

      var cripto = teste.charCodeAt(); // 'i','g','o','r'  igor.charCodeAt(0) asc ii 66
      if (cripto >= 65 && cripto <= 90) {
        // alfabeto minúsculo
        return String.fromCharCode(((cripto - 65 + chave) % 26) + 65);
        // ex:cripto = 70 --> 70-65 + chave(ex:2) --> 5 + 2 --> 7 (%26 mantém dentro do tamanho do alfabeto e se passar volta pro início) -->+65 (volta pro códico ascii)  72
      } else if (cripto >= 97 && cripto <= 122) {
        return String.fromCharCode(((cripto - 97 + chave) % 26) + 97);
      } else {
        return teste;
      }
    })
    .join(""); // o join vai junta o nosso  array tranformando em string dnv EX:igor
}
function decodifica(texto, chave) {
  return texto
    .map((teste) => {
      var cripto = teste.charCodeAt();
      if (cripto >= 65 && cripto <= 90) {
        return cripto - 65 - chave < 0
          ? String.fromCharCode(((cripto - 65 - chave + 26) % 26) + 65)
          : String.fromCharCode(((cripto - 65 - chave) % 26) + 65);
      } else if (cripto >= 97 && cripto <= 122) {
        return cripto - 97 - chave < 0
          ? String.fromCharCode(((cripto - 97 - chave + 26) % 26) + 97)
          : String.fromCharCode(((cripto - 97 - chave) % 26) + 97);
      } else {
        return teste;
      }
    })
    .join("");
}

radio[0].addEventListener("click", function () {
  if (radio[0].checked) {
    botao.textContent = "CODIFICAR";
  }
});

radio[1].addEventListener("click", function () {
  if (radio[1].checked) {
    botao.textContent = "DECODIFICAR";
  }
});
