package main

import "fmt"

/* This is a multi-line comment
   It spans multiple lines */
// This is single-line comment    

func main() {
  // This is a single-line comment
  var x int = 10
  if x > 5 {
    fmt.Println("x is greater than 5")
  } else {
    fmt.Println("x is not greater than 5")
  }
}