from setuptools import setup, find_packages


with open('README.rst') as f:
    readme = f.read()

with open('LICENSE') as f:
    license = f.read()

setup(
    name='practice',
    version='0.1.0',
    description='For my freelancer',
    long_description=readme,
    author='Jaeyeon Jo',
    author_email='entertm77@gmail.com',
    license=license,
    packages=find_packages(exclude=('tests', 'docs'))
)