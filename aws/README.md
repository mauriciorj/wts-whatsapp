Either "package" folder and "lambda_function.zip" can be delete.

1 - on /aws run:

pip install supabase --target ./package --platform manylinux2014_x86_64 --implementation cp --python-version 3.13 --only-binary=:all: --upgrade

2 - It will create the "package" folder
3 - Copy "lambda" folder directory to "package" folder

3 - run the following commmands:
cd package
zip -r ../lambda_function.zip .

