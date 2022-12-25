using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BlockSelector : MonoBehaviour
{

    [SerializeField]
    private GameObject[] blocks;

    [SerializeField]
    private Texture2D[] images;

    public static Block[] blocksList;

    public static Block currentBlock;
    public static int selectedIndex = 0;
    // Start is called before the first frame update
    void Awake ()
    {
        initBlocks();
        currentBlock = blocksList[0];
    }

    void initBlocks() {
        blocksList = new Block[blocks.Length];
        for (int i = 0; i < blocks.Length; i++) {
            Block blockObj = new Block(blocks[i], images[i]);
            blocksList[i] = blockObj;
        }
    }

    public static void setBlockIndex(int index) {
        if (index > 3)
        {
            Block[] temp = { blocksList[index] };
            List<Block> tempBlockList = new List<Block>(blocksList);
            tempBlockList.RemoveAt(index);

            List<Block> newGameObjectList = new List<Block>();
            newGameObjectList.AddRange(temp);
            newGameObjectList.AddRange(tempBlockList);

            blocksList = newGameObjectList.ToArray();
            currentBlock = blocksList[0];
        }
        else {
            currentBlock = blocksList[index];
            selectedIndex = index;
        }
    }
}
