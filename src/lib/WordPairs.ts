import { sample } from 'lodash'

const WORD_PAIRS = [
  ['los cubiertos', 'das Besteck'],
  ['los platos', 'die Teller'],
  ['gustar', 'mögen'],
  ['colgar', 'aufhängen'],
  ['aspirar', 'staubsaugen'],
  ['podar', 'Rasen mähen'],
  ['de hecho', 'eigentlich'],
  ['frenar', 'bremsen'],
  ['duele', 'tut weh'],
  ['la ralladura', 'der Kratzer'],
  ['seguramente', 'bestimmt'],
  ['la tierra', 'die Erde'],
  ['el sillin', 'der Sattel'],
  ['el deseo', 'der Wunsch'],
  ['la tienda', 'der Laden / das Geschäft'],
  ['ir de compras', 'einkaufen gehen'],
  ['antes', 'vor / vorher'],
  ['despues', 'nach / nachher'],
  ['recibir', 'bekommen, erhalten'],
  ['prometer', 'versprechen'],
  ['temprano', 'früh'],
  ['abrazar', 'umarmen'],
  ['inmediatamente', 'sofort'],
  ['vestirse', 'sich anziehen'],
  ['ajustar', 'einstellen'],
  ['presentar', 'vorstellen'],
  ['bucear', 'tauchen'],
  ['das Meer', 'el mar'],
  ['la hamaca', 'die Hängematte'],
  ['la electricidad', 'die Elektrizität'],
  ['cuidadoso', 'vorsichtig'],
  ['de repente', 'plötzlich'],
  ['hacer tonterias', 'quatsch machen'],
  ['también', 'auch'],
  ['berrinche', 'Wutanfall'],
  ['por cada', 'jeweils'],
  ['proximo', 'nächster'],
  ['elegir', 'wählen'],
  ['el casco', 'der Helm'],
  ['mostrar', 'zeigen'],
  ['parar', 'anhalten'],
  ['el apartamento', 'die Wohnung'],
  ['los muebles', 'die Möbel'],
  ['un rato', 'eine Weile'],
  ['juntos', 'gemeinsam'],
  ['la calma', 'die Ruhe'],
  ['el silencio', 'die Stille'],
  ['feminino', 'weiblich'],
  ['masculino', 'männlich'],
  ['produzir', 'erzeugen'],
  ['cerca', 'nah'],
  ['el vecino', 'der Nachbar'],
  ['reciclar', 'recyceln'],
  ['correr', 'laufen'],
  ['estar enojada', 'sauer sein'],
  ['observar', 'beobachten'],
  ['la tiza', 'die Kreide'],
  ['entre', 'zwischen'],
  ['traducir', 'übersetzen'],
  ['engargarse', 'sich kümmern'],
  ['p. ej. (por ejemplo)', 'z. B. (zum Beispiel)'],
  ['detallado', 'ausführlich'],
  ['detallado', 'ausführlich'],
  ['comprensible', 'verständlich / anschaulich'],
  ['marrón claro', 'hellbraun'],
  ['el pelo de animal', 'das Fell'],
  ['brilliante', 'glänzend'],
  ['pequeño', 'klein'],
  ['los ojos', 'die Augen'],
  ['lavar platos', 'Geschirrspülen'],
  ['rapido', 'schnell'],
  ['saltar', 'springen'],
  ['pelo rizado', 'lockiges Haar'],
]

export const getRandomWordPair = () =>
  sample(
    WORD_PAIRS.map(wordPair => {
      return {
        spanish: wordPair[0],
        german: wordPair[1],
      }
    }),
  )
