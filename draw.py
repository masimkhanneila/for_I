from PIL import Image, ImageDraw, ImageFont


def draw_heart():

    width = 600
    height = 600

    # Transparent background
    image = Image.new(
        "RGBA",
        (width, height),
        (0, 0, 0, 0)
    )

    draw = ImageDraw.Draw(image)

    pink = (255, 105, 180, 255)

    # Draw heart
    for x in range(width):

        for y in range(height):

            xx = (x - 300) / 150
            yy = (300 - y) / 150

            value = (
                (xx ** 2 + yy ** 2 - 1) ** 3
                - xx ** 2 * yy ** 3
            )

            if value <= 0:
                draw.point(
                    (x, y),
                    fill=pink
                )

    # Text
    text = "I luv u"

    try:
        font = ImageFont.truetype(
            "arial.ttf",
            55
        )
    except:
        font = ImageFont.load_default()

    bbox = draw.textbbox(
        (0, 0),
        text,
        font=font
    )

    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    text_x = (
        width - text_width
    ) / 2

    text_y = (
        height - text_height
    ) / 2

    draw.text(
        (text_x, text_y),
        text,
        fill="white",
        font=font
    )

    image.save("heart.png")

    return "heart.png"