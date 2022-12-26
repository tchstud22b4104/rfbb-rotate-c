using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ImageStore : MonoBehaviour
{

    [SerializeField]
    private Texture2D[] imagesHelper;

    public static Texture2D[] imagesList;
    void Awake()
    {
        imagesList = imagesHelper;
    }

    public Texture2D getImageByIndex(int index) {
        return imagesList[index];
    }

    public Texture2D getImageByName(string name) {
        for (int i = 0; i < imagesList.Length; i++) {
            if (imagesList[i].name == name) {
                return imagesList[i];
            }
        }

        return null;
    }
}
