using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlockSelector : MonoBehaviour
{
    [SerializeField]
    private GameObject[] blockListHelper;

    public static GameObject[] blocksList;

    public static GameObject currentBlock;
    // Start is called before the first frame update
    void Awake ()
    {
        blocksList = blockListHelper;
        currentBlock = blocksList[0];
    }

    public static void setBlockIndex(int index) {
        if (index > 3)
        {
            GameObject[] temp = { blocksList[index] };
            List<GameObject> tempBlockList = new List<GameObject>(blocksList);
            tempBlockList.RemoveAt(index);

            List<GameObject> newGameObjectList = new List<GameObject>();
            newGameObjectList.AddRange(temp);
            newGameObjectList.AddRange(tempBlockList);

            blocksList = newGameObjectList.ToArray();
            currentBlock = blocksList[0];
        }
        else {
            currentBlock = blocksList[index];
        }
    }
}
