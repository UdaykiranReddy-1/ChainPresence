const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("StudentAttendanceDeployment", (m) => {
  
        const studentAttendance = m.contract("StudentAttendance",  [
              ["0x074ab3d4943650F21E5F6212Fd4E726195a6C6a4", "0x4cABBe8ac46b3662EeE9C4b8926A44b8BB8d0FA4"], // Example student addresses
              "0x656B9E8CBEdCAD6B922520616e81c82ef40A4cDc" // Example teacher address
          ],
           {
            from: m.signer, // Use the deployer account
            log: true // Enables logging of deployment actions for debugging
           }
        );

        // Optional: Use deployment results in subsequent operations or further deployments
        return {
            studentAttendance
        };
    })
