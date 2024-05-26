package main

import (
    "fmt"
)

type Person struct {
    Name    string
    Age     int
}

func main() {
    fmt.Println("Ejemplo de código más complejo en Go")

    var num1, num2 int = 10, 20
    var result int

    result = num1 + num2
    fmt.Println("La suma de", num1, "y", num2, "es", result)

    // Slice de enteros
    numbers := []int{1, 2, 3, 4, 5}
    for i, num := range numbers {
        fmt.Println("Número", i, ":", num)
    }

    // Mapa de personas
    people := map[string]Person{
        "Alice": Person{Name: "Alice", Age: 30},
        "Bob":   Person{Name: "Bob", Age: 25},
    }
    for _, person := range people {
        fmt.Println(person.Name, "tiene", person.Age, "años")
    }

    // Función recursiva
    fmt.Println("Factorial de 5:", factorial(5))
}

func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}
