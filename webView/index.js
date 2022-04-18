module.exports = {
  resetPasswordEmail: (req) => {
    return `
<html>
<head> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>The Just Friend App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <style>
    body{
      height: 100vh;
      background-image: linear-gradient(to bottom,#005AA7,#aefafa);
    }
  </style>
  </head>
<body>
    <div class="container" width="100%">
      <div class="d-flex">
      <img src="http://${req.headers.host}/uploads/logo1.png" alt="" width="200px" class="m-auto mt-3">
    </div>
     
        <div class="bg-light p-3 rounded col-12 col-md-6 offset-md-3">
          <div class="h5 text-dark">Reset Password For Just Friend App</div>
            <div class="form-group mt-1">
              <label for="pass">New Password</label>
              <input type="password" class="form-control my-1" id="pass"  placeholder="Enter New Password">
            </div>
            <div class="form-group">
              <label for="cpass">Password</label>
              <input type="password" class="form-control my-1" id="cpass" placeholder="Confirm Password">
            </div>
            <div onclick="submit()" class="btn btn-primary mt-3 align-self-center">Reset Password</div>
          </div>          
    </div>
    <script>
      function submit(){
        var pass=document.getElementById('pass').value;
        var cpass=document.getElementById('cpass').value;
        if(pass.length<6){
          alert("Easy Password");
          return;          
        }
        if(cpass.length<6){
          alert("Password Mismatched");
          return
        }
        if(pass!=cpass){
          alert ("Pasword Mismatched");
          return;
        }
        if(pass==cpass){
          ChangePassword();
        }            
      }
      function ChangePassword(){
        var pass=document.getElementById('pass').value;
        const data = { password:pass  };
        fetch('http://${req.headers.host}/api/user/reset/password', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'${req.params.token}'
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert(data.message)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }   
    </script>   
</body>
</html>`;
  },
  verifyUserProfile: (req) => {
    return `
<html>
<head> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>The Beba App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <style>
    body{
      height: 100vh;
      background-image: linear-gradient(to bottom,#005AA7,#aefafa);
    }
  </style>
  </head>
<body>
    <div class="container" width="100%">
      <div class="d-flex">
      <img src="http://${req.headers.host}/uploads/logo1.png" alt="" width="200px" class="m-auto mt-3">
    </div>
     
        <div class="bg-light p-3 rounded col-12 col-md-6 offset-md-3">
          <div class="h5 text-dark">Enter Your Password to Verify</div>
            <div class="form-group mt-1">
              <label for="pass">Password</label>
              <input type="password" class="form-control my-1" id="pass"  placeholder="Enter Password">
            </div>
            <div class="form-group">
              <label for="cpass">Password</label>
              <input type="password" class="form-control my-1" id="cpass" placeholder="Confirm Password">
            </div>
            <div onclick="submit()" class="btn btn-primary mt-3 align-self-center">Verify E-mail</div>
          </div>          
    </div>
    <script>
      function submit(){
        var pass=document.getElementById('pass').value;
        var cpass=document.getElementById('cpass').value;
        if(pass.length<6){
          alert("Easy Password");
          return;          
        }
        if(pass!=cpass){
          alert ("Pasword Mismatched");
          return;
        }
        if(pass==cpass){
          VerifyEmail();
        }            
      }
      function VerifyEmail(){
        var pass=document.getElementById('pass').value;
        const data = { password:pass  };
        fetch('http://${req.headers.host}/api/user/verify/email', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'${req.params.token}'
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert(data.message)
            if(data.success){window.close()}
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }   
    </script>   
</body>
</html>`;
  },

  EditUserProfile: (req) => {
    return `
<html>
<head> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>The Beba App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <style>
    body{
      height: 100vh;
      background-image: linear-gradient(to bottom,#005AA7,#aefafa);
    }
  </style>
  </head>
<body>
    <div class="container" width="100%">
      <div class="d-flex">
      <img src="http://${req.headers.host}/uploads/logo1.png" alt="" width="200px" class="m-auto mt-3">
    </div>
     
        <div class="bg-light p-3 rounded col-12 col-md-6 offset-md-3">
          <div class="h5 text-dark">Enter Your Password to Add New Email</div>
            <div class="form-group mt-1">
              <label for="pass">Password</label>
              <input type="password" class="form-control my-1" id="pass"  placeholder="Enter Password">
            </div>
            <div class="form-group">
              <label for="cpass">Password</label>
              <input type="password" class="form-control my-1" id="cpass" placeholder="Confirm Password">
            </div>
            <div onclick="submit()" class="btn btn-primary mt-3 align-self-center">Edit E-mail</div>
          </div>          
    </div>
    <script>
      function submit(){
        var pass=document.getElementById('pass').value;
        var cpass=document.getElementById('cpass').value;
        if(pass.length<6){
          alert("Easy Password");
          return;          
        }
        if(pass!=cpass){
          alert ("Pasword Mismatched");
          return;
        }
        if(pass==cpass){
          VerifyEmail();
        }            
      }
      function VerifyEmail(){
        var pass=document.getElementById('pass').value;
        const data = { password:pass  };
        fetch('http://${req.headers.host}/api/user/edit/email', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'${req.params.token}'
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert(data.message)
            if(data.success){window.close()}
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }   
    </script>   
</body>
</html>`;
  },
};
