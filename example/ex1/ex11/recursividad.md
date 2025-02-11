# Recursión

Recursión o recursividad es la forma en la cual se especifica un proceso basado en su propia definición.1​ La recursión tiene esta característica discernible en términos de autorreferencialidad, autopoiesis, fractalidad, o, en otras palabras, construcción a partir de un mismo tipo. Con ánimo de una mayor precisión, y para evitar la aparente circularidad en esta definición, se formula el concepto de recursión de la siguiente manera:

Un problema que pueda ser definido en función de su tamaño, sea este N, pueda ser dividido en instancias más pequeñas (< N) del mismo problema y se conozca la solución explícita a las instancias más simples, lo que se conoce como casos base, se puede aplicar inducción sobre las llamadas más pequeñas y suponer que estas quedan resueltas.

Para que se entienda mejor a continuación se exponen algunos ejemplos:

 ## Factorial:
 Se desea calcular n ! {\displaystyle n!\,} n!\, (el factorial de n {\displaystyle n\,} n\,, que se define como el producto de todos los enteros positivos de 1 {\displaystyle 1\,} 1\, a n {\displaystyle n\,} n\,). Se puede definir el problema de forma recurrente como n ( n − 1 ) ! {\displaystyle n(n-1)!\,} n(n-1)!\,; como ( n − 1 ) ! {\displaystyle (n-1)!\,} (n-1)!\, es menor que n ! {\displaystyle n!\,} n!\, podemos aplicar inducción por lo que disponemos del resultado. El caso base es 0 ! {\displaystyle 0!\,} 0!\, que es 1 {\displaystyle 1\,} 1\,.


 ## Algoritmo de ordenación por fusión:
 Sea v un vector de n elementos, podemos separar el vector en dos mitades. Estas dos mitades tienen tamaño n/2 por lo que, por inducción, podemos aplicar la ordenación en estos dos subproblemas. Una vez tenemos ambas mitades ordenadas simplemente debemos fusionarlas. El caso base es ordenar un vector de cero o un elemento, que está trivialmente ordenado y no hay que hacer nada.

 [Fuente](https://es.wikipedia.org/wiki/Recursi%C3%B3n)