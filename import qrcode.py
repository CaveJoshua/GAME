import qrcode

url = "https://resume-jhuacv.pages.dev/"

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # High error tolerance (up to 30%)
    box_size=12,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

# Generate and save the image
img = qr.make_image(fill_color="black", back_color="white")
img.save("resume_qr.png")

print("Saved high-res QR code to resume_qr.png")