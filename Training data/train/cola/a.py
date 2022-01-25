import numpy as np
import argparse
import cv2
from skimage import data, exposure, restoration




def modify(img):
    return image





textfile_path=r"E:\ps\original\files_name.txt"

with open(textfile_path,"r", encoding='utf-8') as f:
    content = f.readlines()

for line in content:
    if line.strip().endswith('.jpg'):
        original = cv2.imread(line.strip(), -1)
        final = modify(original)
        up_line="edit_"+line[:-6]+timet+".jpg"
        cv2.imwrite(up_line, fianl1)
        print("writing "+up_line+" to the disk")
stop = timeit.default_timer()
print("The Time taken is "+str(stop - start)+" seconds")
