using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using static UnityEngine.GraphicsBuffer;
using System.IO.Pipes;

public class RotateCamera2 : MonoBehaviour
{

    public Transform target;
    public Camera sceneCamera;

    public bool isDesktop;

    [Range(5f, 15f)]
    [Tooltip("How sensitive the mouse drag to camera rotation")]
    public float mouseRotateSpeed = 5f;
    [Range(0.1f, 50f)]
    [Tooltip("How sensitive the touch drag to camera rotation")]
    public float touchRotateSpeed = 10f;
    [Tooltip("Smaller positive value means smoother rotation, 1 means no smooth apply")]
    public float slerpSmoothValue = 0.3f;
    [Tooltip("How long the smoothDamp of the mouse scroll takes")]
    public float scrollSmoothTime = 0.12f;
    public float editorFOVSensitivity = 5f;
    public float touchFOVSensitivity = 5f;
    //Can we rotate camera, which means we are not blocking the view
    public static bool canRotate = true;
    public static bool uiFocused = false;
    private Vector2 swipeDirection; //swipe delta vector2
    private Vector2 touch1OldPos;
    private Vector2 touch2OldPos;
    private Vector2 touch1CurrentPos;
    private Vector2 touch2CurrentPos;
    private Quaternion currentRot; // store the quaternion after the slerp operation
    private Quaternion targetRot;
    private Touch touch;
    //Mouse rotation related
    private float rotX; // around x
    private float rotY; // around y
                        //Mouse Scroll
    private float cameraFieldOfView;
    private float cameraFOVDamp; //Damped value
    private float fovChangeVelocity = 0;
    private float distanceBetweenCameraAndTarget;
    //Clamp Value
    private float minXRotAngle = -85; //min angle around x axis
    private float maxXRotAngle = 50; // max angle around x axis
    private float minCameraFieldOfView = 6;
    private float maxCameraFieldOfView = 100;
    Vector3 dir;
    private void Awake()
    {
        GetCameraReference();
    }
    // Start is called before the first frame update
    void Start()
    {
        distanceBetweenCameraAndTarget = Vector3.Distance(sceneCamera.transform.position, target.position);
        dir = new Vector3(0, 0, distanceBetweenCameraAndTarget);//assign value to the distance between the maincamera and the target
        sceneCamera.transform.position = target.position + dir; //Initialize camera position
        cameraFOVDamp = sceneCamera.fieldOfView;
        cameraFieldOfView = sceneCamera.fieldOfView;
    }
    // Update is called once per frame
    void Update()
    {
        if (!canRotate || uiFocused)
        {
            return;
        }
        //We are in editor - used to be: Application.isEditor || Application.platform == RuntimePlatform.WindowsPlayer
        if (isDesktop)
        {
            EditorCameraInput();
        }
        else //We are in mobile mode
        {
            TouchCameraInput();
        }
        if (Input.GetKeyDown(KeyCode.F))
        {
            FrontView();
        }
        if (Input.GetKeyDown(KeyCode.T))
        {
            TopView();
        }
        if (Input.GetKeyDown(KeyCode.L))
        {
            LeftView();
        }
    }
    private void LateUpdate()
    {
        RotateCamera();
        SetCameraFOV();
    }
    public void GetCameraReference()
    {
        if (sceneCamera == null)
        {
            sceneCamera = Camera.main;
        }
    }
    //May be the problem with Euler angles
    public void TopView()
    {
        rotX = -85;
        rotY = 0;
    }
    public void LeftView()
    {
        rotY = 90;
        rotX = 0;
    }
    public void FrontView()
    {
        rotX = 0;
        rotY = 0;
    }
    private void EditorCameraInput()
    {
        //Camera Rotation
        if (Input.GetMouseButton(0))
        {
            rotX += Input.GetAxis("Mouse Y") * mouseRotateSpeed; // around X
            rotY += Input.GetAxis("Mouse X") * mouseRotateSpeed;
            if (rotX < minXRotAngle)
            {
                rotX = minXRotAngle;
            }
            else if (rotX > maxXRotAngle)
            {
                rotX = maxXRotAngle;
            }
        }
        //Camera Field Of View
        if (Input.mouseScrollDelta.magnitude > 0)
        {
            cameraFieldOfView += Input.mouseScrollDelta.y * editorFOVSensitivity * -1;//-1 make FOV change natual
        }
    }
    private void TouchCameraInput()
    {
        if (Input.touchCount > 0)
        {
            if (Input.touchCount == 1)
            {
                touch = Input.GetTouch(0);
                if (touch.phase == TouchPhase.Began)
                {
                    //Debug.Log("Touch Began");
                }
                else if (touch.phase == TouchPhase.Moved)  // the problem lies in we are still rotating object even if we move our finger toward another direction
                {
                    swipeDirection += touch.deltaPosition * touchRotateSpeed; //-1 make rotate direction natural
                }
                else if (touch.phase == TouchPhase.Ended)
                {
                    //Debug.Log("Touch Ended");
                }
            }
            else if (Input.touchCount == 2)
            {
                Touch touch1 = Input.GetTouch(0);
                Touch touch2 = Input.GetTouch(1);
                if (touch1.phase == TouchPhase.Began && touch2.phase == TouchPhase.Began)
                {
                    touch1OldPos = touch1.position;
                    touch2OldPos = touch2.position;
                }
                if (touch1.phase == TouchPhase.Moved && touch2.phase == TouchPhase.Moved)
                {
                    touch1CurrentPos = touch1.position;
                    touch2CurrentPos = touch2.position;
                    float deltaDistance = Vector2.Distance(touch1CurrentPos, touch2CurrentPos) - Vector2.Distance(touch1OldPos, touch2OldPos);
                    cameraFieldOfView += deltaDistance * -1 * touchFOVSensitivity; // Make rotate direction natual
                    touch1OldPos = touch1CurrentPos;
                    touch2OldPos = touch2CurrentPos;
                }
            }
        }
        if (swipeDirection.y < minXRotAngle)
        {
            swipeDirection.y = minXRotAngle;
        }
        else if (swipeDirection.y > maxXRotAngle)
        {
            swipeDirection.y = maxXRotAngle;
        }
    }
    private void RotateCamera()
    {
        //used to be editor check from above - Application.isEditor || Application.platform == RuntimePlatform.WindowsPlayer
        if (isDesktop)
        {
            Vector3 tempV = new Vector3(rotX, rotY, 0);
            targetRot = Quaternion.Euler(tempV); //We are setting the rotation around X, Y, Z axis respectively
        }
        else
        {
            targetRot = Quaternion.Euler(swipeDirection.y, swipeDirection.x, 0);
        }
        //Rotate Camera
        currentRot = Quaternion.Slerp(currentRot, targetRot, Time.smoothDeltaTime * slerpSmoothValue * 50);  //let cameraRot value gradually reach newQ which corresponds to our touch
                                                                                                             //Multiplying a quaternion by a Vector3 is essentially to apply the rotation to the Vector3
                                                                                                             //This case it's like rotate a stick the length of the distance between the camera and the target and then look at the target to rotate the camera.
        sceneCamera.transform.position = target.position + currentRot * dir;
        sceneCamera.transform.LookAt(target.position);
    }
    void SetCameraFOV()
    {
        //Set Camera Field Of View
        //Clamp Camera FOV value
        if (cameraFieldOfView <= minCameraFieldOfView)
        {
            cameraFieldOfView = minCameraFieldOfView;
        }
        else if (cameraFieldOfView >= maxCameraFieldOfView)
        {
            cameraFieldOfView = maxCameraFieldOfView;
        }
        cameraFOVDamp = Mathf.SmoothDamp(cameraFOVDamp, cameraFieldOfView, ref fovChangeVelocity, scrollSmoothTime);
        sceneCamera.fieldOfView = cameraFOVDamp;
    }
}