provider "aws" {
  region = "ap-south-1"
}

resource "aws_key_pair" "banking_key" {
  key_name   = "banking-key"
  public_key = file("banking-key.pub")
}

resource "aws_security_group" "banking_sg" {
  name = "banking-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "banking_app" {
  ami                    = "ami-0f58b397bc5c1f2e8"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.banking_key.key_name
  vpc_security_group_ids = [aws_security_group.banking_sg.id]

  tags = {
    Name = "banking-fraud-system"
  }
}

output "public_ip" {
  value = aws_instance.banking_app.public_ip
}