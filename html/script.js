document.addEventListener('DOMContentLoaded', function() {
  let shipments = [];

  const shipmentForm = document.getElementById('shipmentForm');
  const editShipmentForm = document.getElementById('editShipmentForm');

  shipmentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const senderName = document.getElementById('senderName').value;
    const senderAddress = document.getElementById('senderAddress').value;
    const senderEmail = document.getElementById('senderEmail').value;
    const senderPhone = document.getElementById('senderPhone').value;

    const receiverName = document.getElementById('receiverName').value;
    const receiverAddress = document.getElementById('receiverAddress').value;
    const receiverEmail = document.getElementById('receiverEmail').value;
    const receiverPhone = document.getElementById('receiverPhone').value;

    const shipmentType = document.getElementById('shipmentType').value;
    const shipmentWeight = document.getElementById('shipmentWeight').value;
    const courier = document.getElementById('courier').value;
    const packages = document.getElementById('packages').value;
    const mode = document.getElementById('mode').value;
    const product = document.getElementById('product').value;
    const carrier = document.getElementById('carrier').value;
    const carrierRefNumber = document.getElementById('carrierRefNumber').value;
    const comment = document.getElementById('comment').value;

    const deliveryDate = document.getElementById('deliveryDate').value;
    const departureDate = document.getElementById('departureDate').value;
    const paymentOption = document.getElementById('paymentOption').value;
    const totalFlight = document.getElementById('totalFlight').value;

    const trackingNumber = generateTrackingNumber();

    const shipment = {
      trackingNumber: trackingNumber,
      senderName: senderName,
      senderAddress: senderAddress,
      senderEmail: senderEmail,
      senderPhone: senderPhone,
      receiverName: receiverName,
      receiverAddress: receiverAddress,
      receiverEmail: receiverEmail,
      receiverPhone: receiverPhone,
      shipmentType: shipmentType,
      shipmentWeight: shipmentWeight,
      courier: courier,
      packages: packages,
      mode: mode,
      product: product,
      carrier: carrier,
      carrierRefNumber: carrierRefNumber,
      comment: comment,
      deliveryDate: deliveryDate,
      departureDate: departureDate,
      paymentOption: paymentOption,
      totalFlight: totalFlight
    };

    shipments.push(shipment);

    // Reset form after submission
    shipmentForm.reset();

    // Display receipt details
    displayReceipt(shipment);

    // Store shipment details in local storage
    localStorage.setItem('shipments', JSON.stringify(shipments));
  });

  editShipmentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const trackingNumber = document.getElementById('editTrackingNumber').value;
    const shipmentIndex = shipments.findIndex(item => item.trackingNumber === trackingNumber);

    if (shipmentIndex !== -1) {
      // Update shipment details
      shipments[shipmentIndex] = {
        trackingNumber: trackingNumber,
        senderName: document.getElementById('editSenderName').value,
        senderAddress: document.getElementById('editSenderAddress').value,
        senderEmail: document.getElementById('editSenderEmail').value,
        senderPhone: document.getElementById('editSenderPhone').value,
        receiverName: document.getElementById('editReceiverName').value,
        receiverAddress: document.getElementById('editReceiverAddress').value,
        receiverEmail: document.getElementById('editReceiverEmail').value,
        receiverPhone: document.getElementById('editReceiverPhone').value,
        shipmentType: document.getElementById('editShipmentType').value,
        shipmentWeight: document.getElementById('editShipmentWeight').value,
        courier: document.getElementById('editCourier').value,
        packages: document.getElementById('editPackages').value,
        mode: document.getElementById('editMode').value,
        product: document.getElementById('editProduct').value,
        carrier: document.getElementById('editCarrier').value,
        carrierRefNumber: document.getElementById('editCarrierRefNumber').value,
        comment: document.getElementById('editComment').value,
        deliveryDate: document.getElementById('editDeliveryDate').value,
        departureDate: document.getElementById('editDepartureDate').value,
        paymentOption: document.getElementById('editPaymentOption').value,
        totalFlight: document.getElementById('editTotalFlight').value
      };

      // Display updated receipt details
      displayReceipt(shipments[shipmentIndex]);

      // Update stored shipments in local storage
      localStorage.setItem('shipments', JSON.stringify(shipments));
    } else {
      alert('Tracking number not found.');
    }
  });

  const printReceiptBtn = document.getElementById('printReceiptBtn');
  printReceiptBtn.addEventListener('click', function() {
    printReceipt();
  });

  function displayReceipt(shipment) {
    const printedReceipt = document.getElementById('printableReceipt');
    printedReceipt.innerHTML = `
      <div class="receipt-header">
        <img src="logo.png" alt="Logo">
        <h3>Receipt</h3>
      </div>
      <div class="receipt-details">
        <p><strong>Sender Information:</strong></p>
        <p>Name: ${shipment.senderName}</p>
        <p>Address: ${shipment.senderAddress}</p>
        <p>Email: ${shipment.senderEmail}</p>
        <p>Phone Number: ${shipment.senderPhone}</p>
        <hr class="line">
        <p><strong>Receiver Information:</strong></p>
        <p>Name: ${shipment.receiverName}</p>
        <p>Address: ${shipment.receiverAddress}</p>
        <p>Email: ${shipment.receiverEmail}</p>
        <p>Phone Number: ${shipment.receiverPhone}</p>
        <hr class="line">
        <p><strong>Shipment Details:</strong></p>
        <p>Type: ${shipment.shipmentType}</p>
        <p>Weight: ${shipment.shipmentWeight}</p>
        <p>Courier: ${shipment.courier}</p>
        <p>Packages: ${shipment.packages}</p>
        <p>Mode: ${shipment.mode}</p>
        <p>Product: ${shipment.product}</p>
        <p>Carrier: ${shipment.carrier}</p>
        <p>Carrier Ref Number: ${shipment.carrierRefNumber}</p>
        <p>Comment: ${shipment.comment}</p>
        <p>Delivery Date: ${shipment.deliveryDate}</p>
        <p>Departure Date: ${shipment.departureDate}</p>
        <p>Payment Option: ${shipment.paymentOption}</p>
        <p>Total Flight: ${shipment.totalFlight}</p>
        <hr class="line">
        <p><strong>Tracking Number:</strong> ${shipment.trackingNumber}</p>
      </div>
    `;
    document.getElementById('receipt').classList.remove('hidden');
  }

  function printReceipt() {
    const printableReceipt = document.getElementById('receipt').innerHTML;
    const originalBody = document.body.innerHTML;

    document.body.innerHTML = printableReceipt;

    window.print();

    document.body.innerHTML = originalBody;
  }

  const trackForm = document.getElementById('trackForm');
  trackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const trackingNumber = document.getElementById('trackingNumber').value;
    const shipment = shipments.find(item => item.trackingNumber === trackingNumber);

    if (shipment) {
      const trackingResult = `
        <h3>Tracking Result for ${trackingNumber}</h3>
        <p><strong>Sender's Information:</strong></p>
        <p>Name: ${shipment.senderName}</p>
        <p>Address: ${shipment.senderAddress}</p>
        <p>Email: ${shipment.senderEmail}</p>
        <p>Phone Number: ${shipment.senderPhone}</p>
        <hr class="line">
        <p><strong>Receiver's Information:</strong></p>
        <p>Name: ${shipment.receiverName}</p>
        <p>Address: ${shipment.receiverAddress}</p>
        <p>Email: ${shipment.receiverEmail}</p>
        <p>Phone Number: ${shipment.receiverPhone}</p>
        <hr class="line">
        <p><strong>Shipment Details:</strong></p>
        <p>Type: ${shipment.shipmentType}</p>
        <p>Weight: ${shipment.shipmentWeight}</p>
        <p>Courier: ${shipment.courier}</p>
        <p>Packages: ${shipment.packages}</p>
        <p>Mode: ${shipment.mode}</p>
        <p>Product: ${shipment.product}</p>
        <p>Carrier: ${shipment.carrier}</p>
        <p>Carrier Ref Number: ${shipment.carrierRefNumber}</p>
        <p>Comment: ${shipment.comment}</p>
        <p>Delivery Date: ${shipment.deliveryDate}</p>
        <p>Departure Date: ${shipment.departureDate}</p>
        <p>Payment Option: ${shipment.paymentOption}</p>
        <p>Total Flight: ${shipment.totalFlight}</p>
        <hr class="line">
        <p><strong>Tracking Time:</strong> ${new Date().toLocaleString()}</p>
      `;
      document.getElementById('trackingResult').innerHTML = trackingResult;
      document.getElementById('trackingResult').classList.remove('hidden');
    } else {
      document.getElementById('trackingResult').innerHTML = '<p>Tracking number not found.</p>';
      document.getElementById('trackingResult').classList.remove('hidden');
    }
  });

  function loadStoredShipments() {
    const storedShipmentsList = document.getElementById('storedShipmentsList');
    const storedShipments = JSON.parse(localStorage.getItem('shipments')) || [];

    storedShipments.forEach((shipment, index) => {
      const storedShipment = document.createElement('div');
      storedShipment.classList.add('stored-shipment');
      storedShipment.innerHTML = `
        <button class="toggle-details" onclick="toggleDetails(${index})">Toggle Details</button>
        <div class="details">
          <p><strong>Sender Name:</strong> ${shipment.senderName}</p>
          <p><strong>Receiver Name:</strong> ${shipment.receiverName}</p>
          <p><strong>Tracking Number:</strong> ${shipment.trackingNumber}</p>
          <button onclick="editShipment(${index})">Edit</button>
        </div>
      `;
      storedShipmentsList.appendChild(storedShipment);
    });
  }

  function toggleDetails(index) {
    const shipmentDetails = document.querySelectorAll('.stored-shipment .details')[index];
    shipmentDetails.classList.toggle('open');
  }

  function editShipment(index) {
    const shipment = shipments[index];
    document.getElementById('editTrackingNumber').value = shipment.trackingNumber;
    document.getElementById('editSenderName').value = shipment.senderName;
    document.getElementById('editSenderAddress').value = shipment.senderAddress;
    document.getElementById('editSenderEmail').value = shipment.senderEmail;
    document.getElementById('editSenderPhone').value = shipment.senderPhone;
    document.getElementById('editReceiverName').value = shipment.receiverName;
    document.getElementById('editReceiverAddress').value = shipment.receiverAddress;
    document.getElementById('editReceiverEmail').value = shipment.receiverEmail;
    document.getElementById('editReceiverPhone').value = shipment.receiverPhone;
    document.getElementById('editShipmentType').value = shipment.shipmentType;
    document.getElementById('editShipmentWeight').value = shipment.shipmentWeight;
    document.getElementById('editCourier').value = shipment.courier;
    document.getElementById('editPackages').value = shipment.packages;
    document.getElementById('editMode').value = shipment.mode;
    document.getElementById('editProduct').value = shipment.product;
    document.getElementById('editCarrier').value = shipment.carrier;
    document.getElementById('editCarrierRefNumber').value = shipment.carrierRefNumber;
    document.getElementById('editComment').value = shipment.comment;
    document.getElementById('editDeliveryDate').value = shipment.deliveryDate;
    document.getElementById('editDepartureDate').value = shipment.departureDate;
    document.getElementById('editPaymentOption').value = shipment.paymentOption;
    document.getElementById('editTotalFlight').value = shipment.totalFlight;

    // Show edit form
    document.getElementById('editShipment').classList.remove('hidden');
  }

  loadStoredShipments();

  function generateTrackingNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  }
});

