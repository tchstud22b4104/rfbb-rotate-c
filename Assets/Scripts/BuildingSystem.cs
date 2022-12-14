using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BuildingSystem : MonoBehaviour
{
    public GameObject[] blocks;
    private GameObject blockObject;

    public Transform parent;

    public Color normalColor;
    public Color highlightedColor;

    GameObject lastHightlightedBlock;

    private float mouseDownTime;
    private float mouseNotMovingStartTime;

    private Vector3 lastMousePos;
    private Vector3 mouseDelta;
    private bool canHoldPlace = true;

    public float holdTimeToFastPlace = 1f;

    private float fastBuildStartTime = 0;
    private bool inHoldPlace = false;

    private void Start()
    {
        blockObject = blocks[0];
    }

    private void Update()
    {
        mouseDelta = Input.mousePosition - lastMousePos;

        lastMousePos = Input.mousePosition;

        for (int i = 0; i < 9; i++) {
            if (Input.GetKeyDown(i.ToString())){
                blockObject = blocks[i];
            }
        }
        if (Input.GetMouseButtonDown(0))
        {
            mouseDownTime = Time.time;
            mouseNotMovingStartTime = Time.time;
            canHoldPlace = true;
        }
        if (Input.GetMouseButtonUp(0)) {
            if (Time.time - mouseDownTime < 0.2f) {
                BuildBlock(blockObject);
            }
            RotateCamera2.canRotate = true;
            inHoldPlace = false;
        }
        if (Input.GetMouseButton(1))
        {
            DestroyBlock();
        }

        HighlightBlock();

        if (Input.GetMouseButton(0))
        {
            if (mouseMoving()) {
                mouseNotMovingStartTime = Time.time;
                canHoldPlace = false;
            }

            if (Time.time - mouseNotMovingStartTime > holdTimeToFastPlace && canHoldPlace) {
                RotateCamera2.canRotate = false;
                inHoldPlace = true;
            }

            if (inHoldPlace) {
                if (Time.time > fastBuildStartTime + 0.1f){
                    BuildBlock(blockObject);
                    fastBuildStartTime = Time.time;
                }
            }
        }
    }

    bool mouseMoving() {
        return Mathf.Abs(mouseDelta.x) > 0.2f || Mathf.Abs(mouseDelta.y) > 0.2f || Mathf.Abs(mouseDelta.z) > 0.2f;
    }

    void BuildBlock(GameObject block)
    {
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out RaycastHit hitInfo))
        {
            Vector3 spawnPosition = new Vector3(Mathf.RoundToInt(hitInfo.point.x + hitInfo.normal.x / 2), Mathf.RoundToInt(hitInfo.point.y + hitInfo.normal.y / 2), Mathf.RoundToInt(hitInfo.point.z + hitInfo.normal.z / 2));

            Instantiate(block, spawnPosition, Quaternion.identity, parent);
        }
    }

    void DestroyBlock()
    {
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out RaycastHit hitInfo))
        {
            if (hitInfo.transform.tag == "Block")
            {
                Destroy(hitInfo.transform.gameObject);
            }
        }
    }

    void HighlightBlock()
    {
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out RaycastHit hitInfo))
        {
            if (hitInfo.transform.tag == "Block")
            {
                if (lastHightlightedBlock == null)
                {
                    lastHightlightedBlock = hitInfo.transform.gameObject;
                    hitInfo.transform.gameObject.GetComponent<Renderer>().material.color = highlightedColor;
                }
                else if (lastHightlightedBlock != hitInfo.transform.gameObject)
                {
                    lastHightlightedBlock.GetComponent<Renderer>().material.color = normalColor;
                    hitInfo.transform.gameObject.GetComponent<Renderer>().material.color = highlightedColor;
                    lastHightlightedBlock = hitInfo.transform.gameObject;
                }
            }
            else if (lastHightlightedBlock != null)
            {
                lastHightlightedBlock.GetComponent<Renderer>().material.color = normalColor;
                lastHightlightedBlock = null;
            }
        }
    }
}