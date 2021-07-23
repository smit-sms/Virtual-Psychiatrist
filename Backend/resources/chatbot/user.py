import string
class User(object):
    
    def __init__(self):
        self.input = ""
        self.text_taulukko = []
    
    def original_input(self, input):
        self.input = input
        
    def print_input(self):
        print(self.input)
    
    def get_input(self):
        return self.input
        
    '''
    Read input and return it as an array of words or punctuations
    '''    
    def read(self, input):
        self.input = input
        text = input.strip()
        letter_list = []
        for i in text:
            letter_list.append(i)
        self.separate_punctuations(letter_list)
        text = ""
        for i in letter_list:
            text = text + i
        text = text.strip()
        text_taulukko = text.split(" ")
        i = 0
        #remove spaces in the array
        while i < len(text_taulukko):
            if text_taulukko[i] == "":
                text_taulukko.pop(i)
            else:
                i=i+1
        text_taulukko = self.cut_sentences(text_taulukko)
        self.text_taulukko = text_taulukko
        return text_taulukko
        
    '''
    Separate punctuations as own elements
    '''
    def separate_punctuations(self, letter_list):
        s = 0
        while s < len(letter_list):
            if letter_list[s] in string.punctuation and letter_list[s] != "'":
                idx_begin= s
                itr = idx_begin
                if itr+1 <= len(letter_list):
                    itr = itr+1
                    idx_end=itr
                    while itr < len(letter_list) and letter_list[itr] in string.punctuation:
                        itr=itr+1
                    idx_end=itr
                    s=idx_end
                    letter_list.insert(idx_end, " ")
                    letter_list.insert(idx_begin, " ")
            s=s+1
        return letter_list
      
    '''
    Check whether user input is a question.
    '''
    def is_question(self, input):
        for kirjain in input:
            if kirjain == "?":
                return True
        return False
        
    '''
    Check whether user is yelling and using !!
    '''
    def is_yelling(self, input):
        for kirjain in input:
            if kirjain == "!":
                return True
        return False
        
    '''
    Return indices where is punctuations
    '''    
    def remove_punctuations(self, input):
        st = input
        st = ''.join((x for x in st if x not in string.punctuation))
        return st
    
    '''
    Find sentences and separates them putting ##cut## between them.
    Remove extra punctuations in the beginning and in the end.
    Example: John went to a grosery. He bought milk. He forgot to buy bread.
    ---> John went to a grosery ##cut## He bought milk ##cut## He forgot to buy bread
    '''
    def cut_sentences(self, input):
        cut_list = [".","!","?"]
        sana = 0
        while sana < len(input):
            kirjain = 0
            while kirjain < len(input[sana]):
                if input[sana][kirjain] in cut_list:
                    input.pop(sana)
                    input.insert(sana, "##cut##")
                    break
                kirjain = kirjain +1
            sana = sana+1
            while len(input) > 0 and (input[0][0] in string.punctuation or input[0] =="##cut##"):
                if len(input) > 0:
                    input.pop(0)
            while len(input) > 0 and (input[len(input)-1][0] in string.punctuation or input[len(input)-1] =="##cut##"):
                if len(input) > 0:
                    input.pop(len(input)-1)
        return input
