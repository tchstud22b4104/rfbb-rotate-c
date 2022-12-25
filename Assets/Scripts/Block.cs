using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Block
{
    private GameObject gameObject;
    private Texture2D blockImage;

    public Block(GameObject gameObject, Texture2D blockImage) {
        this.gameObject = gameObject;
        this.blockImage = blockImage;
    }


    public GameObject getGameObject() {
        return this.gameObject;
    }

    public Texture2D getImage() {
        return this.blockImage;
    }
}
