# CSE 154

## Assignment Information

You can download the support files for the homework assignments from the [course
website](https://courses.cs.washington.edu/courses/cse154/17au/).

## Basic Cloud9 Setup

We will walk through setting up your Cloud9 workspace, and creating and viewing
your first HTML file!

### Cloning the Cloud9 Workspace

1. Go to your Cloud9 homepage (https://c9.io/) and sign in if you aren't already.
2. Click on `Create a new workspace`
3. Change the option from `Hosted workspace` to `Clone workspace`
4. Select `kthayeruw/cse154_student_17au` on the drop-down for `Clone workspace`
5. Choose a Workspace name at the top such as `cse154` or `cse154_17au`, and then click `Create workspace`

### Creating an HTML File

1. Go to your workspace (found at `https://ide.c9.io/<username>/<workspace name>`)
2. Click `File > New File`
3. Paste the following into the body of the new file:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>CSE 154 Test Page</title>
    </head>
    <body>
        <p>
            Welcome to CSE 154!
        </p>
    </body>
</html>
```
4. Click `File > Save As`, and choose the filename `welcome.html`
5. Pick whatever folder you want to save it in (`/` is fine), and press `Save`

### Rendering and Viewing an HTML File

1. From your workspace, click `Run Project` near the top (with the green play button)
2. Near the bottom, a pane called `Apache & PHP` should have appeared, with text similar to `Starting Apache httpd, serving https://cse154-17sp-cmoussi.c9users.io/.` (but with a URL customized to your username)
3. To view the HTML file you created, visit the URL from the above step with the filename appended to the end -- in my case, `https://cse154-17sp-cmoussi.c9users.io/welcome.html`. (Note: if you saved the file into a folder other than `/`, you will need the full file path. You can right-click the html file in the left-hand pane and click `Copy file path` to see the exact path you need to append to your URL.)
4. When you are done, you can click `Stop` where `Run Project` used to be