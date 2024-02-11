import pyperclip
textinput = input()

textlist = textinput.split(" ")

for index, text in enumerate(textlist):

    text = '<div class="colorShiftOnHover">' + text + ' </div>'

    textlist[index] = text

textString = ""

for text in textlist:

    textString += text

pyperclip.copy(textString)
print(textString)
input()