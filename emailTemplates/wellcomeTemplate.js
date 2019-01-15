const wellcomeTemplate = info => {
	return `
        <strong>
         Hello !
        ${info.name} 
        </strong>
        <br/>
        <br/>
        <p> 
            Thanks For Activating Your Account
            Now You Can use Your Account And Explore 
            All of Our Features
       </p>
       <a href=${info.link}>explore</a>
    
       <br/>
       <br/>
    `;
};

module.exports = wellcomeTemplate;
