const verificationTemplate = info => {
	return `
        <strong> Hello! ${info.name}</strong> 
        <br> 
        <br>


        <p> 
          Thanks For Interest in Our Application
          We Have Recived Your Registration Requiest
        </p>

        <br>
        <br>

        <p>
            to Verify  Please Click The Below Link  

            <br>
            <br> 
          
            <a href=${info.link}>Verify</a>
            
            <br>
            <br> 

              or Copy Paste on Your Favourite Browser
              <br>
              <br> 
              ${info.link}
        </p>

        <br>
        <br>

    `;
};

module.exports = verificationTemplate;
