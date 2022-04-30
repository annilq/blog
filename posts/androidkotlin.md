---
title:  android kotlin小记
date: 2022-04-10 11:36:40
tags: android kotlin
---

### kotlin class继承

```kotlin
import kotlin.math.PI
fun main() {
    val squareCabin = SquareCabin(6,10.0)
	val roundHut = RoundHut(3,10.0)
	val roundTower = RoundTower(3,4.0,10)

    with(squareCabin) {
        println("\nSquare Cabin\n============")
        println("Floor area: ${floorArea()}")
        println("Capacity: ${capacity}")
        println("Material: ${buildingMaterial}")
        println("Has room? ${hasRoom()}")
    }
    with(roundHut) {
        println("\nRoundHut\n============")
        getRoom()
		getRoom()
        println("Capacity: ${capacity}")
        println("Material: ${buildingMaterial}")
        println("Has room? ${hasRoom()}")
    }
    with(roundTower) {
        println("\nRoundTower\n============")
        println("Capacity: ${capacity}")
        println("Material: ${buildingMaterial}")
        println("Has room? ${hasRoom()}")
    }
}

abstract class Dwelling(private var residents: Int) {
    abstract val buildingMaterial: String
    abstract val capacity: Int
    abstract fun floorArea():Double

    fun hasRoom(): Boolean {
       return residents < capacity
   	}
    
    fun getRoom(){
        if(hasRoom()){
            residents = residents+1
            println("you get a room")
        }else{
            println("no room to assign")
        }
	}
}

class SquareCabin(val residents: Int,val length:Double) : Dwelling(residents) {
    override val buildingMaterial = "Wood"
    override val capacity = 6
    override fun floorArea():Double{
        return length*length
    }
}

open class RoundHut(val residents: Int, val radius:Double) : Dwelling(residents) {
    override val buildingMaterial = "Straw"
    override val capacity = 4
    override fun floorArea():Double{
        return PI*radius*radius
    }
}
 class RoundTower(residents: Int,radius:Double,val floors:Int) : RoundHut(residents,radius) {
    override val buildingMaterial = "Stone"
    override val capacity = 4 * floors
    override fun floorArea():Double{
        return super.floorArea()*floors
    }
}
```