from avn_puzzle.randmath.RArithmetic import RandArithmetic, TeX, Eval
from avn_puzzle.randunit.utils import sympy


def is_one_dimensional(lst):
    return all(not isinstance(item, list) for item in lst)


def Web_Interface(
    name="N",
    level=0,
    operators="+",
    terms=1,
    zero=None,
    number_of_page=1,
    number_of_question=10,
    **kwargs
):
    random_generator_math = RandArithmetic(
        name=name,
        level=level,
        operators=operators,
        terms=terms,
        zero=zero,
    )
    random_generator_math = random_generator_math.Questions_Set(
        number_of_question, number_of_page
    )
    if is_one_dimensional(random_generator_math):
        randmaths_data = [[[str(TeX(i)), repr(i)] for i in random_generator_math]]
        # sympy.latex()
    else:
        randmaths_data = [
            [
                [str(TeX(j)), repr(j)]
                for j in (i if not is_one_dimensional(random_generator_math) else [i])
            ]
            for i in random_generator_math
        ]
    return randmaths_data
