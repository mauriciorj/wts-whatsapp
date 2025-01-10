1 - on /aws, run:

pip install supabase --target ./package --platform manylinux2014_x86_64 --implementation cp --python-version 3.13 --only-binary=:all: --upgrade

2 - copy /lambda directory to /package

3 - run the following commmands:
cd package
zip -r ../lambda_function.zip .

